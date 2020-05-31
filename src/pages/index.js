import React from 'react';
import Widget from '../widgets/widget';

const Index = () => {
    return(
        <div className="homepage-container">
            <Widget title="Orders">
                <div className="orders-element">
                    <div className="orders-element__order-status" style={{backgroundColor: 'orange'}}/>
                    <div className="orders-element__text-status">New</div>
                    <div className="orders-element__num-status">0</div>
                </div>
                <div className="orders-element">
                    <div className="orders-element__order-status" style={{backgroundColor: 'lightblue'}}/>
                    <div className="orders-element__text-status">Pending</div>
                    <div className="orders-element__num-status">0</div>
                </div>
                <div className="orders-element">
                    <div className="orders-element__order-status" style={{backgroundColor: 'black'}}/>
                    <div className="orders-element__text-status">Shipping</div>
                    <div className="orders-element__num-status">0</div>
                </div>
                <div className="orders-element">
                    <div className="orders-element__order-status" style={{backgroundColor: 'green'}}/>
                    <div className="orders-element__text-status">Completed</div>
                    <div className="orders-element__num-status">0</div>
                </div>
            </Widget>
        </div>
    );
};

export default Index;
