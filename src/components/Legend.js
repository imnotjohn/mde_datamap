import React from 'react';
import './Legend.css';

export default function Legend(props) {
    const {colors} = props;
    return (
        <div className="Legend">
            <div className="subcontainer">
                <div className="tribal" style={{backgroundColor: colors.tribal}}/><span className="detail">Tribal Lands</span>
            </div>
            <div className="subcontainer">
                <div className="brownfields" style={{backgroundColor: colors.brownfields}}/><span className="detail">Brownfields</span>
            </div>
            <div className="subcontainer">
                <div className="emptydata" style={{color: colors.emptydata}}>
                    <span>✖</span>
                </div><span className="detail">Inconclusive Superfunds</span>
            </div>
            <div className="subcontainer">
                <div className="petroleum" style={{color: colors.petroleum}}>
                    <span>&nbsp;&nbsp;&#823;</span>
                </div><span className="detail">petroleum pipelines</span>
            </div>
            <div className="subcontainer">
                <div className="crudeoil" style={{color: colors.crudeoil}}>
                    <span>&nbsp;&nbsp;&#823;</span>
                </div><span className="detail">Crudeoil Pipelines</span>
            </div>
        </div>
    )
}