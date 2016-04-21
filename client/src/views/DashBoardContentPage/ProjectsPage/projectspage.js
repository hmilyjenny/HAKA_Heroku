import React from 'react';
import {Table} from "react-bootstrap";

var ProjectsPage = React.createClass({
    render:function(){
      return(
        <Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>#</th>
        <th>项目名称</th>
        <th>创建时间</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>项目1</td>
        <td>2016-01-23</td>
        <td>未完成</td>
        <td><a>编辑</a></td>
      </tr>
      <tr>
        <td>2</td>
        <td>项目2</td>
        <td>2016-03-12</td>
        <td>发布</td>
        <td><a>查看</a></td>
      </tr>
    </tbody>
  </Table>
      )
    }
});
export default ProjectsPage;
