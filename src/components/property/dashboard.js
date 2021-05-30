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

    callGetProperties = () => {
        this.props.getProperties(this.props.skipped + dataToSkip);
    }

    render() {
        const { propertyList, hasMoreProperties } = this.props;

        return (
            <div className="row dashboard h-100">
                <div className="col-12">
                    {isEmpty(propertyList) ? (
                        <div className="alert alert-primary m-4 text-center">
                            <h5>No Properties Found</h5>
                        </div>
                    ) : (
                            <div style={{
                                overflow: 'auto',
                                display: 'flex',
                                flexDirection: 'column-reverse',
                            }}>
                                <InfiniteScroll
                                    dataLength={propertyList.length}
                                    next={this.callGetProperties}
                                    hasMore={hasMoreProperties}
                                    loader={<h4>Loading...</h4>}
                                    endMessage={
                                        <p className="text-center">
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }
                                >
                                    <Properties isMyProperty={false} properties={propertyList} />
                                </InfiniteScroll>
                            </div>
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
        hasMoreProperties: state.property.has_more_properties
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProperties: (skip) => dispatch(propertyActions.getProperties(skip))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);