import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import InfiniteScroll from 'react-infinite-scroll-component';

import { propertyActions } from "../../_actions/property.action";
import Loading from "../loading";
import Properties from "./properties";

const dataToSkip = 10;

class Dashboard extends Component {
    componentDidMount() {
        this.props.getProperties(0)
    }

    render() {
        if (this.props.loading) return <Loading />

        const { propertyList, getProperties, skipped } = this.props;

        return (
            <div className="row dashboard h-100">
                <div className="col-12">
                    {isEmpty(propertyList) ? (
                        <div className="alert alert-primary m-4 text-center">
                            <h5>No Properties Found</h5>
                        </div>
                    ) : (
                            <InfiniteScroll
                                dataLength={propertyList.length}
                                next={getProperties(skipped + dataToSkip)}
                                hasMore={true}
                                loader={<h4>Loading...</h4>}
                                endMessage={
                                    <p className="text-center">
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                            >
                                <Properties properties={propertyList} />
                            </InfiniteScroll>
                        )}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        propertyList: state.property.property_list,
        loading: state.property.loading,
        skipped: state.property.skipped,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProperties: (skip) => dispatch(propertyActions.getProperties(skip))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);