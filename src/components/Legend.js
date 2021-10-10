import React from 'react';
import './Legend.css';

export default function Legend(props) {
    const {colors} = props;
    return (
        <div className="Legend">
            <div className="subcontainer">
                <div className="tribal" style={{backgroundColor: colors.tribal}}/>
            </div>
            <div className="subcontainer">
                <div className="brownfields" style={{backgroundColor: colors.brownfields}}/>
            </div>
            <div className="subcontainer">
                <div className="emptydata" style={{color: colors.emptydata}}>
                    <span>✖</span>
                </div>
            </div>
            <div className="subcontainer">
                <div className="petroleum" style={{color: colors.petroleum}}>
                    <span>&#823;</span>
                </div>
            </div>
            <div className="subcontainer">
                <div className="crudeoil" style={{color: colors.crudeoil}}>
                    <span>&#823;</span>
                </div>
            </div>
        </div>
    )
}