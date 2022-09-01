import axios from 'axios';
import React, { useState, useEffect } from 'react';

const DataTable = () => {
    const [dataTableData, setDataTableData] = useState(null);
    const [loaded, setLoaded] = useState(false)
    // let largest = dataTableData.industries[0].in_occupation_jobs;
    const fetchData = async () => {
        await axios.get('https://run.mocky.io/v3/a2cc3707-8691-4188-8413-6183a7bb3d32')
            .then(res => {
                setDataTableData(res.data)
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoaded(true));
    };

    useEffect(() => {
        fetchData()
    }, []);
    if (loaded) {
        return (
            <div>
                <h2>Industries Employing {dataTableData.occupation.title}</h2>
                <table>
                    <tbody>
                        <tr>
                            <th className="region-col">Industry</th>
                            <th>Occupation Jobs<br />in Industry<br />&#40;{dataTableData.employing_industries.year}&#41;</th>
                            <th>% of Occupation<br />in Industry<br />&#40;{dataTableData.employing_industries.year}&#41;</th>
                            <th>% of Total<br />Jobs in<br />Industry<br />&#40;{dataTableData.employing_industries.year}&#41;</th>
                        </tr>
                        {dataTableData.employing_industries.industries.map((industry) => (
                            <tr>
                                <th style={{width: `${(industry.in_occupation_jobs/dataTableData.employing_industries.industries[0].in_occupation_jobs)*100}%`, backgroundColor:"rgba(135,206,235,0.3)"}}>🏢{industry.title}</th>
                                <th>{industry.in_occupation_jobs}</th>
                                <th>{((industry.in_occupation_jobs/dataTableData.employing_industries.jobs)*100).toFixed(1)}</th>
                                <th>{((industry.in_occupation_jobs/industry.jobs)*100).toFixed(1)}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
    return <span>Loading...</span>
}

export default DataTable;