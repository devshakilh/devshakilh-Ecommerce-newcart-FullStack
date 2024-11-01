import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { getSellerRequests } from '../../actions/userAction';

const AdminSellerRequests = () => {
    const dispatch = useDispatch();
    const { loading, error, requests } = useSelector(state => state.sellerRequests);

    useEffect(() => {
        dispatch(getSellerRequests());
    }, [dispatch]);

    return (
        <div>
            <h1>Pending Seller Requests</h1>
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request._id}>
                                <td>{request.name}</td>
                                <td>{request.email}</td>
                                <td>{request.sellerRequest}</td>
                                <td>
                                    <Link to={`/admin/user/${request._id}`}>View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminSellerRequests;
