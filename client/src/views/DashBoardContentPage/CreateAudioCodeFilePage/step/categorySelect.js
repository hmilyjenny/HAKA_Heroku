import React from 'react';
import {bindActionCreators} from 'redux';
//import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {connect} from 'react-redux';
import {Button, Input, Panel, Well, Form, Radio} from "react-bootstrap";
import {getCategories}  from '../../../../actions/systemActions';
import {savaProjectCategory} from '../../../../actions/projectActions';
import LoadingIndicatior from '../../../../components/LoadingIndicator';


var CategorySelect = React.createClass({
    //mixins: [LinkedStateMixin],
    getInitialState: function () {
        return {
            categories: [],
            loading: true,
            selectCategory: null
        }
    },
    componentWillMount: function () {
        this.props.getCategoriesActions();
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            categories: nextProps.categories,
            loading: nextProps.loading
        });
        //
        //console.log('loading');
    },
    showComponent: function () {
        var _this = this;//map中对象改变
        var selectCategoryHandleChange = function (e) {
            //console.log(e.target.value)
            _this.setState({selectCategory: e.target.value})
        };
        if (_this.state.loading) {
            return <LoadingIndicatior />
        } else {
            var categoriesItems = _this.props.categories.map(function (category) {
                return (<Input name='category' type='radio' label={category.name}
                               value={JSON.stringify(category)} key={category._id}
                               onChange={selectCategoryHandleChange}/>)
            });
            return (
                <Panel header="选择品类">
                    <Well>
                        <form>
                            <div>{categoriesItems}</div>
                        </form>
                    </Well>
                    <Button onClick={_this.nextStep}>下一步</Button>
                </Panel>
            )
        }
    },
    nextStep: function () {
        //console.log(this.state.selectCategory);
        let category = JSON.parse(this.state.selectCategory);
        this.props.savaProjectCategory(this.props.currentStep, {
            categoryName: category.name,
            categoryCode: category.code
        });
    },
    render: function () {
        return (
            <div className="text-center">
                {this.showComponent()}
            </div>
        )
    },
})
const mapStateToProps = (state) => ({
    categories: state.system.categories,
    //systemStatusText: state.system.statusText
    //statusText      : state.project.statusText,
    //currentStep:       state.project.step
});

const mapDispatchToProps = (dispatch) => ({
    getCategoriesActions: bindActionCreators(getCategories, dispatch),
    savaProjectCategory: bindActionCreators(savaProjectCategory, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect);
