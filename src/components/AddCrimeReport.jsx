import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function AddCrimeReport  () {

    const history = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const tokenExpiry = localStorage.getItem('tokenExpiry');
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (!token || !tokenExpiry || currentTime > tokenExpiry) {
            // Token is missing or expired
            localStorage.removeItem('authToken');
            localStorage.removeItem('tokenExpiry');
            history('/login');
        }
    }, []);
    // State to handle multiple crime reports
    const [reports, setReports] = useState([
        {
            drNo: '',
            dateRptd: '',
            dateOcc: '',
            timeOcc: '',
            area: '',
            areaName: '',
            rptDistNo: '',
            part1Or2: '',
            crmCd: '',
            crmCdDesc: '',
            mocodes: '',
            victAge: '',
            victSex: '',
            victDescent: '',
            premisCd: '',
            premisDesc: '',
            weaponUsedCd: '',
            weaponDesc: '',
            status: '',
            statusDesc: '',
            crmCd1: '',
            crmCd2: '',
            crmCd3: '',
            crmCd4: '',
            location: '',
            crossStreet: '',
            lat: '',
            lon: ''
        }
    ]);

    // Handle change for each report form
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedReports = [...reports];
        updatedReports[index] = {
            ...updatedReports[index],
            [name]: value
        };
        setReports(updatedReports);
    };

    // Add a new empty report form
    const handleAddReport = () => {
        setReports([
            ...reports,
            {
                drNo: '',
                dateRptd: '',
                dateOcc: '',
                timeOcc: '',
                area: '',
                areaName: '',
                rptDistNo: '',
                part1Or2: '',
                crmCd: '',
                crmCdDesc: '',
                mocodes: '',
                victAge: '',
                victSex: '',
                victDescent: '',
                premisCd: '',
                premisDesc: '',
                weaponUsedCd: '',
                weaponDesc: '',
                status: '',
                statusDesc: '',
                crmCd1: '',
                crmCd2: '',
                crmCd3: '',
                crmCd4: '',
                location: '',
                crossStreet: '',
                lat: '',
                lon: ''
            }
        ]);
    };

    // Remove a report form
    const handleRemoveReport = (index) => {
        const updatedReports = reports.filter((_, i) => i !== index);
        setReports(updatedReports);
    };

    // Submit all reports to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;
            const response = await axios.post('http://localhost:8080/crime/crime/add-crime', reports);
            console.log(response);
            alert('Crime reports added successfully!');
            setReports([]);  // Reset the reports array after successful submission
        } catch (error) {
            console.error(error);
            alert('There was an error adding the crime reports.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add New Crime Reports</h2>
            <form onSubmit={handleSubmit}>
                {reports.map((report, index) => (
                    <div key={index} className="report-form">
                        <h3>Crime Report {index + 1}</h3>

                        {/* Report Number */}
                        <div className="mb-3">
                            <label className="form-label">Report Number (drNo)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="drNo"
                                value={report.drNo}
                                onChange={(e) => handleChange(e, index)}
                                required
                            />
                        </div>

                        {/* Date Reported */}
                        <div className="mb-3">
                            <label className="form-label">Date Reported (dateRptd)</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                name="dateRptd"
                                value={report.dateRptd}
                                onChange={(e) => handleChange(e, index)}
                                required
                            />
                        </div>

                        {/* Date Occurred */}
                        <div className="mb-3">
                            <label className="form-label">Date Occurred (dateOcc)</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                name="dateOcc"
                                value={report.dateOcc}
                                onChange={(e) => handleChange(e, index)}
                                required
                            />
                        </div>

                        {/* Time Occurred */}
                        <div className="mb-3">
                            <label className="form-label">Time Occurred (timeOcc)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="timeOcc"
                                value={report.timeOcc}
                                onChange={(e) => handleChange(e, index)}
                                required
                            />
                        </div>

                        {/* Area */}
                        <div className="mb-3">
                            <label className="form-label">Area</label>
                            <input
                                type="number"
                                className="form-control"
                                name="area"
                                value={report.area}
                                onChange={(e) => handleChange(e, index)}
                                required
                            />
                        </div>

                        {/* Area Name */}
                        <div className="mb-3">
                            <label className="form-label">Area Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="areaName"
                                value={report.areaName}
                                onChange={(e) => handleChange(e, index)}
                                required
                            />
                        </div>

                        {/* Report District Number */}
                        <div className="mb-3">
                            <label className="form-label">Report District Number (rptDistNo)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="rptDistNo"
                                value={report.rptDistNo}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Part 1 or 2 */}
                        <div className="mb-3">
                            <label className="form-label">Part 1 or 2</label>
                            <input
                                type="text"
                                className="form-control"
                                name="part1Or2"
                                value={report.part1Or2}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Crime Code */}
                        <div className="mb-3">
                            <label className="form-label">Crime Code (crmCd)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="crmCd"
                                value={report.crmCd}
                                onChange={(e) => handleChange(e, index)}
                                required
                            />
                        </div>

                        {/* Crime Code Description */}
                        <div className="mb-3">
                            <label className="form-label">Crime Code Description (crmCdDesc)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="crmCdDesc"
                                value={report.crmCdDesc}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Method of Operation */}
                        <div className="mb-3">
                            <label className="form-label">Method of Operation Codes (mocodes)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="mocodes"
                                value={report.mocodes}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Victim Age */}
                        <div className="mb-3">
                            <label className="form-label">Victim Age (victAge)</label>
                            <input
                                type="number"
                                className="form-control"
                                name="victAge"
                                value={report.victAge}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Victim Sex */}
                        <div className="mb-3">
                            <label className="form-label">Victim Sex (victSex)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="victSex"
                                value={report.victSex}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Victim Descent */}
                        <div className="mb-3">
                            <label className="form-label">Victim Descent (victDescent)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="victDescent"
                                value={report.victDescent}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Premise Code */}
                        <div className="mb-3">
                            <label className="form-label">Premise Code (premisCd)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="premisCd"
                                value={report.premisCd}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Premise Description */}
                        <div className="mb-3">
                            <label className="form-label">Premise Description (premisDesc)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="premisDesc"
                                value={report.premisDesc}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Weapon Used Code */}
                        <div className="mb-3">
                            <label className="form-label">Weapon Used Code (weaponUsedCd)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="weaponUsedCd"
                                value={report.weaponUsedCd}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Weapon Description */}
                        <div className="mb-3">
                            <label className="form-label">Weapon Description (weaponDesc)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="weaponDesc"
                                value={report.weaponDesc}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Status */}
                        <div className="mb-3">
                            <label className="form-label">Status (status)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="status"
                                value={report.status}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Status Description */}
                        <div className="mb-3">
                            <label className="form-label">Status Description (statusDesc)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="statusDesc"
                                value={report.statusDesc}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Crime Codes 1-4 */}
                        <div className="mb-3">
                            <label className="form-label">Crime Codes (crmCd1, crmCd2, crmCd3, crmCd4)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="crmCd1"
                                value={report.crmCd1}
                                onChange={(e) => handleChange(e, index)}
                            />
                            <input
                                type="text"
                                className="form-control mt-2"
                                name="crmCd2"
                                value={report.crmCd2}
                                onChange={(e) => handleChange(e, index)}
                            />
                            <input
                                type="text"
                                className="form-control mt-2"
                                name="crmCd3"
                                value={report.crmCd3}
                                onChange={(e) => handleChange(e, index)}
                            />
                            <input
                                type="text"
                                className="form-control mt-2"
                                name="crmCd4"
                                value={report.crmCd4}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Location */}
                        <div className="mb-3">
                            <label className="form-label">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                name="location"
                                value={report.location}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Cross Street */}
                        <div className="mb-3">
                            <label className="form-label">Cross Street</label>
                            <input
                                type="text"
                                className="form-control"
                                name="crossStreet"
                                value={report.crossStreet}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Latitude */}
                        <div className="mb-3">
                            <label className="form-label">Latitude (lat)</label>
                            <input
                                type="number"
                                step="0.000001"
                                className="form-control"
                                name="lat"
                                value={report.lat}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Longitude */}
                        <div className="mb-3">
                            <label className="form-label">Longitude (lon)</label>
                            <input
                                type="number"
                                step="0.000001"
                                className="form-control"
                                name="lon"
                                value={report.lon}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>

                        {/* Remove button for the report form */}
                        <button type="button" className="btn btn-danger" onClick={() => handleRemoveReport(index)}>
                            Remove Report
                        </button>
                        <hr />
                    </div>
                ))}

                <button type="button" className="btn btn-primary" onClick={handleAddReport}>
                    Add Another Report
                </button>

                <br />
                <br />

                <button type="submit" className="btn btn-success">
                    Submit All Reports
                </button>
            </form>
        </div>
    );
};

export default AddCrimeReport;
