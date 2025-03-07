import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBranch } from '../redux/branchSlice';
import axios from '../api/axiosConfig';

const BranchSelector = () => {
    const [branches, setBranches] = useState([]);
    const dispatch = useDispatch();
    const selectedBranch = useSelector(state => state.branch.selectedBranch);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const res = await axios.get('/branch/get-all-branches', { 
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setBranches(res.data);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };
        fetchBranches();
    }, []);

    const handleBranchChange = (event) => {
        const branchId = event.target.value;
        dispatch(setBranch(branchId));  // ✅ Redux update
    };
    

    return (
        <select onChange={handleBranchChange} value={selectedBranch || ''}>
            <option value="" disabled>Select Branch</option>
            {branches.map(branch => (
                <option key={branch._id} value={branch._id}>{branch.branchName}</option>
            ))}
        </select>
    );
};

export default BranchSelector;


// const BranchSelector = () => {
//     const [branches, setBranches] = useState([]);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchBranches = async () => {
//             const res = await axios.get('/branch/get-all-branches', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
//             setBranches(res.data);
//         };
//         fetchBranches();
//     }, []);

//     const handleBranchChange = (event) => {
//         dispatch(setBranch(event.target.value));
//     };

//     return (
//         <select onChange={handleBranchChange}>
//             <option value="">Select Branch</option>
//             {branches.map(branch => (
//                 <option key={branch._id} value={branch._id}>{branch.branchName}</option>
//             ))}
//         </select>
//     );
// };

// export default BranchSelector;