import React, {useEffect, useState} from 'react';
import { fetchQueryResults } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";


function CrimeQuery ()  {

    const history = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const tokenExpiry = localStorage.getItem('tokenExpiry');
        const currentTime = Date.now() / 1000; // Current time in seconds
        console.log("token = " + token);
        console.log("tokenExpiry = " + tokenExpiry);
        if (!token || !tokenExpiry || currentTime > tokenExpiry) {
            // Token is missing or expired
            localStorage.removeItem('authToken');
            localStorage.removeItem('tokenExpiry');
            history('/login');
        }
    }, []);
    const queries = [
        { id: 'query1', name: 'Query 1', params: ['startTime', 'endTime'] },
        { id: 'query2', name: 'Query 2', params: ['startTime', 'endTime', 'crimeCode'] },
        { id: 'query3', name: 'Query 3', params: ['date'] },
        { id: 'query4', name: 'Query 4', params: ['startTime', 'endTime'] },
        { id: 'query5', name: 'Query 5', params: ['specificDay', 'latFrom', 'latTo', 'lonFrom', 'lonTo'] },
        { id: 'query6', name: 'Query 6', params: ['startTime', 'endTime'] },
        { id: 'query6b', name: 'Query 6 B', params: ['startTime', 'endTime'] },
        { id: 'query7', name: 'Query 7', params: ['startTime', 'endTime'] },
        { id: 'query8', name: 'Query 8', params: ['startTime', 'endTime', 'crimeCode'] },
        { id: 'query9', name: 'Query 9', params: [] },
        { id: 'query10', name: 'Query 10', params: ['crimeCode'] },
        { id: 'query10b', name: 'Query 10 B', params: ['crimeCode'] },
        { id: 'query11', name: 'Query 11', params: ['crimeCode','crimeCode2'] },
        { id: 'query12', name: 'Query 12', params: ['startTime', 'endTime'] },
        { id: 'query13', name: 'Query 13', params: ['startTime', 'endTime','crimeCount'] },
    ];
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [params, setParams] = useState({});
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 7;

    const handleQueryChange = (event) => {
        const query = queries.find((q) => q.id === event.target.value);
        setSelectedQuery(query);
        setParams({});
        setResults(null);
        setError(null);
        setCurrentPage(1);
    };

    const handleParamChange = (event) => {
        setParams({ ...params, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {
        if (!selectedQuery) return;

        try {
            const data = await fetchQueryResults(selectedQuery.id, params);
            setResults(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setResults(null);
        }
    };
    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = results ? results.slice(indexOfFirstRecord, indexOfLastRecord) : [];

    const handleNextPage = () => {
        if (currentPage < Math.ceil(results.length / recordsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Crime Query UI</h1>

            {/* Query Selection */}
            <div className="mb-4">
                <label htmlFor="querySelect" className="form-label">Select Query:</label>
                <select
                    id="querySelect"
                    className="form-select"
                    onChange={handleQueryChange}
                    value={selectedQuery?.id || ''}
                >
                    <option value="">Select a query</option>
                    {queries.map((query) => (
                        <option key={query.id} value={query.id}>
                            {query.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Query Parameters */}
            {selectedQuery && (
                <div className="card p-4 mb-4">
                    <h2>{selectedQuery.name}</h2>
                    {selectedQuery.params.map((param) => (
                        <div key={param} className="mb-3">
                            <label className="form-label">{param}</label>
                            <input
                                type="text"
                                className="form-control"
                                name={param}
                                value={params[param] || ''}
                                onChange={handleParamChange}
                            />
                        </div>
                    ))}
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
            )}

            {/* Results Table */}
            {results && Array.isArray(results) && results.length > 0 && (
                <div className="card p-4">
                    <h2>Results</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark">
                            <tr>
                                {Object.keys(results[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {currentRecords.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, idx) => (
                                        <td key={idx}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Controls */}
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-secondary" onClick={handlePrevPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {Math.ceil(results.length / recordsPerPage)}
                        </span>
                        <button className="btn btn-secondary" onClick={handleNextPage} disabled={currentPage === Math.ceil(results.length / recordsPerPage)}>
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* No Results */}
            {results && Array.isArray(results) && results.length === 0 && (
                <div className="alert alert-warning mt-4">No results found.</div>
            )}

            {/* Error Message */}
            {error && (
                <div className="alert alert-danger mt-4">
                    <h4>Error</h4>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default CrimeQuery;