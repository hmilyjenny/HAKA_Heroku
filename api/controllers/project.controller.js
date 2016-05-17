import Tb_Project from '../models/project';
var gm = require('gm').subClass({imageMagick: true});
import async from 'async';
//import fs from 'fs';
var fs = require('fs');
//mongoose-unique-validator还没有加入，后面完善

export function getProjectById(req, res) {
    if (!req.params.id) {
        res.status(201).json({
            errCode: 40001,
            errMsg: '项目ID',
            data: {}
        });
    } else {
        Tb_Project.findOne({
            _id: req.params.id
        }, function (err, project) {
            if (err) {
                return res.status(201).json({
                    errCode: -1,
                    errMsg: '项目查询错误',
                    data: {
                        error: err
                    }
                });
            }
            if (project) {
                return res.status(201).json({
                    errCode: 0,
                    errMsg: '',
                    data: {
                        project
                    }
                });
            } else {
                return res.status(201).json({
                    errCode: 40003,
                    errMsg: '项目',
                    data: {}
                });
            }
        });
    }
};
export function getProjectByName(req, res) {
    if (!req.body.name) {
        res.status(201).json({
            errCode: 40001,
            errMsg: '项目名称',
            data: {}
        });
    } else {
        Tb_Project.findOne({
            name: req.body.name
        }, function (err, project) {
            if (err) {
                return res.status(201).json({
                    errCode: -1,
                    errMsg: '项目查询错误',
                    data: {
                        error: err
                    }
                });
            }
            if (project) {
                return res.status(201).json({
                    errCode: 0,
                    errMsg: '',
                    data: {
                        project
                    }
                });
            } else {
                return res.status(201).json({
                    errCode: 40003,
                    errMsg: '项目',
                    data: {}
                });
            }
        });
    }
};
export function createProjectName(req, res) {
    if (!req.body.name || !req.body.currentStep) {
        res.status(201).json({
            errCode: 40001,
            errMsg: '项目名称或当前步骤',
            data: {}
        });
    } else {
        let project = new Tb_Project({
            _user: req.user._id,
            name: req.body.name,
            step: parseInt(req.body.currentStep) + 1
        });
        project.save(function (err, newProject) {
            if (err) {
                return res.status(201).json({
                    errCode: 40002,
                    errMsg: '项目名称',
                    data: {
                        error: err
                    }
                });
            }
            res.status(201).json({
                errCode: 0,
                errMsg: '',
                data: {
                    newProject
                }
            }); //考虑节省带宽问题是否只传递id
        });
    }
};
export function createProjectCategories(req, res) {
    if (!req.body.category || !req.body.currentStep) {
        res.status(201).json({
            errCode: 40001,
            errMsg: '项目品类或当前步骤',
            data: {}
        });
    } else {
        //let category = JSON.parse(req.body.category);
        let category = req.body.category;
        Tb_Project.findByIdAndUpdate(req.body.projectId, {
                category: category,
                step: parseInt(req.body.currentStep) + 1
            }, {
                new: true
            },
            function (err, newProject) {
                if (err) {
                    return res.status(201).json({
                        errCode: 40002,
                        errMsg: '项目',
                        data: {
                            error: err
                        }
                    });
                } else {
                    res.status(201).json({
                        errCode: 0,
                        errMsg: '',
                        data: {
                            newProject
                        }
                    }); //考虑节省带宽问题是否不需要返回当前项目
                }
            }
        );
    }
};
export function createProjectChannels(req, res) {
    if (!req.body.channels || !req.body.currentStep) {
        res.status(201).json({
            errCode: 40001,
            errMsg: '项目渠道或当前步骤',
            data: {}
        });
    } else {
        //let category = JSON.parse(req.body.category);
        let channels = req.body.channels;
        Tb_Project.findByIdAndUpdate(req.body.projectId, {
                channels: channels,
                step: parseInt(req.body.currentStep) + 1
            }, {
                new: true
            },
            function (err, newProject) {
                if (err) {
                    return res.status(201).json({
                        errCode: 40002,
                        errMsg: '项目',
                        data: {
                            error: err
                        }
                    });
                } else {
                    res.status(201).json({
                        errCode: 0,
                        errMsg: '',
                        data: {
                            newProject
                        }
                    }); //考虑节省带宽问题是否不需要返回当前项目
                }
            }
        );
    }
};
export function createProjectAudioFile(req, res) {
    if (!req.file.filename || !req.body.currentStep) {
        res.status(201).json({
            errCode: 40001,
            errMsg: '项目音频文件或当前步骤',
            data: {}
        });
    } else { //重构时应提炼方法为中间件
        var gridfs = req.app.get("gridfs");
        var writestream = gridfs.createWriteStream({
            filename: req.file.originalname
        });
        fs.createReadStream("./uploads/" + req.file.filename)
            .on("end", function () {
                fs.unlink("./uploads/" + req.file.filename, function (err) {
                    Tb_Project.findByIdAndUpdate(req.body.projectId, {
                            audioFile: {
                                audioId: writestream.id,
                                audioName: req.file.originalname
                            },
                            step: parseInt(req.body.currentStep) + 1
                        }, {
                            new: false
                        },
                        function (err, newProject) {
                            if (err) {
                                return res.status(201).json({
                                    errCode: 40002,
                                    errMsg: '项目',
                                    data: {
                                        error: err
                                    }
                                });
                            } else {
                                if (newProject.audioFile.length > 0) {
                                    newProject.audioFile.map((audioInfo)=> {
                                        gridfs.remove({_id: audioInfo.audioId}, (subErr)=> {
                                            if (subErr)console.log(subErr);
                                        })
                                    })
                                }
                                newProject.audioFile = [{
                                    audioId: writestream.id,
                                    audioName: req.file.originalname
                                }];
                                newProject.step = parseInt(req.body.currentStep) + 1;
                                res.status(201).json({
                                    errCode: 0,
                                    errMsg: '',
                                    data: {
                                        newProject
                                    }
                                }); //考虑节省带宽问题是否不需要返回当前项目
                            }
                        }
                    );
                    //res.send("success")
                });
            })
            .on("err", function (err) {
                return res.status(201).json({
                    errCode: 40002,
                    errMsg: '项目上传音频文件失败',
                    data: {
                        error: err
                    }
                });
            })
            .pipe(writestream);
    }
};
export function createProjectImageFiles(req, res) {
    if (!req.files || !req.body.currentStep) {
        res.status(201).json({
            errCode: 40001,
            errMsg: '项目图像文件或当前步骤',
            data: {}
        });
    } else { //重构时应提炼方法为中间件
        var images = [];
        var gridfs = req.app.get("gridfs");
        req.files.forEach(function (file, index) {
            async.waterfall([(cb1) => {
                let writestream = gridfs.createWriteStream({
                    filename: file.originalname
                });
                let readStream = fs.createReadStream("./uploads/" + file.filename);
                gm(readStream)
                    .resize('64', '64')
                    .toBuffer((err, buffer)=> {
                        if (!err) {
                            //专门用来存储缩略图数据
                            cb1(null, writestream, buffer);
                        }
                        else {
                            cb1(err, null, null);
                        }
                    });
            }, (writestream, result2, cb2) => {
                images.push({
                    imageId: writestream.id,
                    imageName: file.originalname,
                    imageBuffer: result2
                });
                fs.createReadStream("./uploads/" + file.filename)
                    .on("end", function () {
                        fs.unlink("./uploads/" + file.filename, function (err) {
                        });
                        cb2(null, images);
                    })
                    .on("err", function (err) {
                        cb2(err, null);
                    })
                    .pipe(writestream);
            }], (asyncErr, result) => {
                let error = [];
                if (asyncErr)error.push(asyncErr);
                if (index === (req.files.length - 1)) {
                    if (asyncErr) {
                        return res.status(201).json({
                            errCode: 40002,
                            errMsg: '项目上传图像文件失败',
                            data: {
                                error: error
                            }
                        });
                    }
                    else {
                        Tb_Project.findByIdAndUpdate(req.body.projectId, {state: 'finished'}, {new: true},
                            function (err, newProject) {
                                if (err) {
                                    return res.status(201).json({
                                        errCode: 40002,
                                        errMsg: '项目',
                                        data: {
                                            error: err
                                        }
                                    });
                                } else {
                                    result.map((item)=> {
                                        newProject.imageFiles.push(item);
                                    })
                                    newProject.save((_err)=> {
                                        if (_err) {
                                            return res.status(201).json({
                                                errCode: -1,
                                                errMsg: '保存项目图片时出错',
                                                data: {
                                                    error: _err
                                                }
                                            });
                                        } else {
                                            res.status(201).json({
                                                errCode: 0,
                                                errMsg: '',
                                                data: {
                                                    newProject
                                                }
                                            });//考虑节省带宽问题是否不需要返回当前项目
                                        }
                                    });
                                }
                            });
                    }
                }
            });
        }); //有可能存在存储文件的表浪费的情况，如在更新project发生错误，而存文件时没发生，所以应增加事务性
    }
};
export function getFileThumbnails(req, res) {
    let projectId = req.params.projectId;
    let imgId = req.params.imgId;
    Tb_Project.findOne({_id: projectId}, (err, result)=> {
        if (err) {
            return res.status(201).json({
                errCode: 40002,
                errMsg: '项目查询',
                data: {
                    error: err
                }
            });
        }
        else {
            let _options = {
                path: 'imageFiles'
            }
            Tb_Project.populate(result, _options, (err, _result)=> {
                if (err) {
                    return res.status(201).json({
                        errCode: -1,
                        errMsg: '缩略图查询',
                        data: {
                            error: err
                        }
                    });
                }
                else {
                    result = _result.imageFiles.filter((_item)=> {
                        return _item._id == imgId
                    });
                    res.writeHead(200, {
                        "Content-Type": "image/*"
                    });
                    res.write(result[0].imageBuffer, "binary");
                    res.end();
                }
            });
        }
    })
}
export function getFileImage(req, res) {
    let projectId = req.params.projectId;
    let imgId = req.params.imgId;
    Tb_Project.findOne({_id: projectId}, (err, result)=> {
        if (err) {
            return res.status(201).json({
                errCode: 40002,
                errMsg: '项目查询',
                data: {
                    error: err
                }
            });
        }
        else {
            let _options = {
                path: 'imageFiles'
            }
            Tb_Project.populate(result, _options, (err, _result)=> {
                if (err) {
                    return res.status(201).json({
                        errCode: -1,
                        errMsg: '图片信息查询',
                        data: {
                            error: err
                        }
                    });
                }
                else {
                    result = _result.imageFiles.filter((_item)=> {
                        return _item._id == imgId
                    });
                    let imageFileID = result[0].imageId;
                    let gridfs = req.app.get("gridfs");
                    let readstream = gridfs.createReadStream({
                        _id: imageFileID
                    });
                    readstream.on('error', function (err) {
                        return res.status(201).json({
                            errCode: -1,
                            errMsg: '图片信息查询',
                            data: {
                                error: err
                            }
                        });
                    });
                    readstream.pipe(res);
                }
            });
        }
    });
};
export function getProjectAudioFileByAudioFileId(req, res) {
    if (!req.query.audioId) {
        res.status(201).json({errCode: 40001, errMsg: '音频文件ID', data: {}});
    }
    else {
        var gridfs = req.app.get("gridfs");
        var readstream = gridfs.createReadStream({_id: req.query.audioId});
        readstream.on("error", function (err) {
            return res.status(201).json({errCode: 40003, errMsg: '项目音频文件', data: {error: err}});
        });
        readstream.pipe(res);
    }
};
export function setProjectStep(req, res) {
    if (!req.body.projectId || !req.body.currentStep) {
        res.status(201).json({
            errCode: 40001,
            errMsg: '项目ID或当前步骤',
            data: {}
        });
    }
    else {
        let queryObj = {_id: req.body.projectId};
        let modifyObj = {step: parseInt(req.body.currentStep) + 1};
        let optionObj = {new: true};
        Tb_Project.findByIdAndUpdate(queryObj, modifyObj, optionObj, (err, newProject)=> {
            if (err) {
                return res.status(201).json({
                    errCode: 40002,
                    errMsg: '项目',
                    data: {
                        error: err
                    }
                });
            }
            else {
                res.status(201).json({
                    errCode: 0,
                    errMsg: '',
                    data: {
                        newProject
                    }
                });
            }
        });
    }
}
export function getProjectsListInfo(req, res) {
    let queryTXT = {_user: req.user._id};
    let showField = "_id name state step createdAt";
    if (req.body.query) {
        // 查询条件上传格式示例
        // {"query":[{"field":"name","value":"1"},{"field":"_id","value":"572c719b1bfc3cbe18379fed"}]}
        let queryObj = req.body.query;
        queryObj.query.map((_item)=> {
            if (_item.field === "name") {
                queryTXT[_item.field] = new RegExp(_item.value)
            }
            else {
                queryTXT[_item.field] = _item.value
            }
        })
    }
    Tb_Project.find(queryTXT, showField, {sort: {createdAt: -1}}, function (err, result) {
        if (err) {
            return res.status(201).json({
                errCode: -1,
                errMsg: '项目查询错误',
                data: {
                    error: err
                }
            });
        } else {
            if (!result) {
                result = [];
                res.status(201).json({
                    errCode: 0,
                    errMsg: '',
                    data: {result}
                });
            }
            else {
                result = result.map((_item)=> {
                    //TODO:因为Mongodb中存储的都是MTU时间,所以查询时需要做时间本地化处理
                    let localTime = new Date(_item.createdAt.getTime() + 28800000);
                    _item["createdAtFormat"] = localTime.getFullYear() + "-" + (localTime.getMonth() + 1) + "-" + localTime.getDate();
                    switch (_item.state) {
                        case "unfinished":
                            _item.state = "未完成";
                            break;
                        case "finished":
                            _item.state = "已完成";
                            break;
                        case "release":
                            _item.state = "已发布";
                            break;
                    }
                    let tmpItem = {
                        step: _item.step,
                        state: _item.state,
                        name: _item.name,
                        createdAt: localTime.getFullYear() + "-" + (localTime.getMonth() + 1) + "-" + localTime.getDate(),
                        _id: _item._id
                    };
                    return tmpItem;
                })
                res.status(201).json({
                    errCode: 0,
                    errMsg: '',
                    data: {result}
                });
            }
        }
    })
}
export function removeProject(req, res) {
    if (!req.body.id) {
        res.status(201).json({
            errCode: 40001,
            errMsg: '项目ID',
            data: {}
        });
    } else {
        Tb_Project.findByIdAndRemove(req.body.id, (err, project)=> {
            if (err) {
                return res.status(201).json({
                    errCode: -1,
                    errMsg: '删除项目错误',
                    data: {
                        error: err
                    }
                });
            }
            else {
                if (!project) {
                    return res.status(201).json({
                        errCode: 40003,
                        errMsg: '项目',
                        data: {
                            error: "当前项目不存在"
                        }
                    });
                }
                else {
                    var gridfs = req.app.get("gridfs");
                    // TODO:删除项目包含的图片文件
                    if (project.imageFiles.length > 0) {
                        project.imageFiles.map((imageInfo)=> {
                            gridfs.remove({_id: imageInfo.imageId}, (subErr)=> {
                                if (subErr)console.log(subErr);
                            })
                        })
                    }
                    // TODO:删除项目包含的音频文件
                    if (project.audioFile.length > 0) {
                        project.audioFile.map((audioInfo)=> {
                            gridfs.remove({_id: audioInfo.audioId}, (subErr)=> {
                                if (subErr)console.log(subErr);
                            })
                        })
                    }
                    getProjectsListInfo(req, res);
                }
            }
        });
    }
}
export function removeImageFile(req, res) {
    if (!req.body.projectId || !req.body.imageId) {
        res.status(201).json({
            errCode: 40001,
            errMsg: '项目ID或图片ID',
            data: {}
        });
    }
    else {
        Tb_Project.findById(req.body.projectId, (err, project)=> {
            if (err) {
                return res.status(201).json({
                    errCode: -1,
                    errMsg: '删除项目图片错误',
                    data: {
                        error: err
                    }
                });
            }
            else {
                if (!project) {
                    return res.status(201).json({
                        errCode: 40003,
                        errMsg: '项目',
                        data: {
                            error: "当前项目不存在"
                        }
                    });
                }
                else {
                    var gridfs = req.app.get("gridfs");
                    if (project.imageFiles.length > 0) {
                        let imageItem = project.imageFiles.filter((item)=> {
                            return item.imageId === req.body.imageId
                        });
                        if (!imageItem) {
                            return res.status(201).json({
                                errCode: 40003,
                                errMsg: '项目中的图片',
                                data: {
                                    error: "当前项目中的图片不存在"
                                }
                            });
                        }
                        else {
                            gridfs.remove({_id: imageItem.imageId}, (subErr)=> {
                                if (subErr) {
                                    return res.status(201).json({
                                        errCode: -1,
                                        errMsg: '删除项目图片错误',
                                        data: {
                                            error: subErr
                                        }
                                    });
                                }
                                else {
                                    project.imageFiles.id(imageItem._id).remove();
                                    project.save((proErr)=> {
                                        if (proErr) {
                                            return res.status(201).json({
                                                errCode: -1,
                                                errMsg: '保存项目删除信息错误',
                                                data: {
                                                    error: proErr
                                                }
                                            });
                                        }
                                        else {
                                            return res.status(201).json({
                                                errCode: 0,
                                                errMsg: '',
                                                data: {
                                                    imageItem
                                                }
                                            });
                                        }
                                    });
                                }
                            })
                        }
                    }
                }
            }
        });
    }
};
