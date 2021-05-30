import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { isEmpty } from "lodash";
import InfiniteScroll from 'react-infinite-scroll-component';


import { propertyActions } from '../../../_actions/property.action';
import { history } from '../../../_helpers/history';
import Properties from '../properties';
import Loading from '../../loading';

const dataToSkip = 10;

class UserPropertyDashboard extends Component {

    componentDidMount() {
        this.props.getMyProperties(0);
    }

    handleCreate = (ev) => {
        history.push("/my_properties/0")
    }

    callGetMyProperties = () => {
        this.props.getMyProperties(this.props.skippedMyProperties + dataToSkip);
    }

    render() {
        const { myPropertyList, hasMorePyProperties } = this.props;
        return (
            <div className="row m-4 my_properties">
                <div className="col-6">
                    <h4 className="text-muted">My properties</h4>
                </div>
                <div className="col-6 text-right">
                    <Button onClick={this.handleCreate} color="primary" variant="contained" size="medium">Create</Button>
                </div>
                <div className="col-12"><hr /></div>
                <div className="col-12">
                    {isEmpty(myPropertyList) ? (
                        <div className="alert alert-primary text-center">
                            <h5>No Properties Found</h5>
                        </div>
                    ) : (
                            <div>
                                <InfiniteScroll
                                    dataLength={myPropertyList.length}
                                    next={this.callGetMyProperties}
                                    height={500}
                                    hasMore={hasMorePyProperties}
                                    loader={<h4 className="text-center">Loading...</h4>}
                                    endMessage={
                                        <p className="text-center">
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }
                                >
                                    <Properties isMyProperty={true} properties={myPropertyList} />
                                </InfiniteScroll>
                            </div>
                        )
                    }
                </div>
            </div >
        )
    }
}


function mapStateToProps(state) {
    return {
        myPropertyList: state.property.my_property_list,
        loading: state.property.loading,
        skippedMyProperties: state.property.skipped_my_proprties,
        hasMorePyProperties: state.property.has_more_my_properties
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMyProperties: (skip) => dispatch(propertyActions.getMyProperties(skip))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPropertyDashboard);