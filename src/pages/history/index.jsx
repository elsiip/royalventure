import React, { useState, useEffect } from "react";
import "../../App.css";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { db } from '../../firebase'; 
import { query, where, collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

export default function History() {
    const [userName, setUserName] = useState('Default Name');
    const auth = getAuth()
    const user = auth.currentUser
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [deleteReason, setDeleteReason] = useState('');
    const [editData, setEditData] = useState({
        date: '',
        package: '',
        notes: ''
    });

    // if(user != null){
    //     const email = user.email
    //     console.log(email)
    // }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const querySnapshot = await getDocs(collection(db, 'reservation'));
    //             const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //             setReservations(data);
    //         } catch (error) {
    //             console.error("Error fetching reservations:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    useEffect(() => {
        const fetchData = async() => {
            const q = query(collection(db, "reservation"), where("email", "==", user.email))
            const querySnapshot = await getDocs(q)
            const reservationData = [];
            querySnapshot.forEach((doc) => {
                reservationData.push({ id: doc.id, ...doc.data() });
            });
            setReservations(reservationData);
        }

        if(user){
            fetchData()
        }
    }, [user])

    useEffect(() => {
        const fetchUserName = async () => {
            if (user) {
                const q = query(collection(db, "users"), where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    if (userData && userData.name) {
                        setUserName(userData.name);
                    }
                });
            }
        };
      
        if (user) {
            fetchUserName();
        }
    }, [user]);

    const handleEditModalOpen = (reservation) => {
        setSelectedReservation(reservation);
        setEditData({
            date: reservation.date,
            package: reservation.package,
            notes: reservation.notes
        });
        document.getElementById('editModal').showModal();
    };

    const handleEditModalSave = async () => {
        try {
            await updateDoc(doc(db, 'reservation', selectedReservation.id), {
                date: editData.date,
                package: editData.package,
                notes: editData.notes
            });

            setReservations(prevReservations => {
                return prevReservations.map(reservation => {
                    if (reservation.id === selectedReservation.id) {
                        return {
                            ...reservation,
                            date: editData.date,
                            package: editData.package,
                            notes: editData.notes
                        };
                    } else {
                        return reservation;
                    }
                });
            });

            console.log("Reservation updated successfully!");
            alert("Reservation updated successfully!");

            document.getElementById('editModal').close();
        } catch (error) {
            console.error("Error updating reservation:", error);
        }
    };

    const handleDelete = async () => {
        try {
            if (deleteReason.trim() === '') {
                alert('Please provide a reason for deletion.');
                return;
            }

            await addDoc(collection(db, 'deletedReservations'), {
                reservationId: selectedReservation.id,
                reason: deleteReason,
                deletedAt: new Date(),
            });

            await deleteDoc(doc(db, 'reservation', selectedReservation.id));

            setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== selectedReservation.id));

            console.log("Reservation deleted successfully!");
            alert("Reservation deleted successfully!");

            document.getElementById('deleteModal').close();
        } catch (error) {
            console.error("Error deleting reservation:", error);
        }
    };

    return (
        <div className="bg-[#576250]">
            <Navbar />
            <h1 className="mt-[150.5px] roboto-bold text-[56px] text-center text-white" style={{ lineHeight: '64px', letterSpacing: '-1.12px' }}>Hi, {userName}!</h1>
            <p className="mt-[16px] roboto-regular text-[25px]] text-center text-[#D9D9D9]" style={{ lineHeight: '24px', letterSpacing: '-0.2px' }}>History Reservation</p>
            <div className="container py-[27px] px-[44.5px] w-[1019px] bg-[#D9D9D9] overflow-x-auto" style={{ margin: '39.5px auto', marginBottom:'105px' }}>
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="roboto-regular text-xl text-black" style={{ lineHeight: '24px' }}>No.</th>
                            <th className="roboto-regular text-xl text-black" style={{ lineHeight: '24px' }}>Reservation Date</th>
                            <th className="roboto-regular text-xl text-black" style={{ lineHeight: '24px' }}>Package</th>
                            <th className="roboto-regular text-xl text-black" style={{ lineHeight: '24px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {reservations.map((reservation, index) => (
                            <tr key={reservation.id}>
                                <th className="roboto-regular text-[15px] text-black" style={{ lineHeight: '24px' }}>{index + 1}</th>
                                <td className="roboto-thin text-[15px] text-black" style={{ lineHeight: '24px' }}>
                                    {reservation.date ? new Date(reservation.date).toLocaleString() : ''}
                                </td>
                                <td className="roboto-thin text-[15px] text-black" style={{ lineHeight: '24px' }}>{reservation.package}</td>
                                <td className="roboto-thin text-[15px] text-black" style={{ lineHeight: '24px' }}>
                                    <button className="btn bg-[#A19E96] hover:bg-[#576250] roboto-regular text-white me-3" onClick={() => handleEditModalOpen(reservation)}>Change</button>
                                    <button className="btn bg-red-300 hover:bg-red-500 roboto-regular text-white" onClick={() => {
                                        setSelectedReservation(reservation);
                                        document.getElementById('deleteModal').showModal();
                                    }}>Cancelled</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modal for delete reason */}
            <dialog id="deleteModal" className="modal">
                <div className="modal-box">
                    <h3 className="roboto-bold text-lg">Provide a Reason for Reservation Cancellation</h3>
                    <textarea value={deleteReason} onChange={(e) => setDeleteReason(e.target.value)} className="py-4 px-2 border w-full h-32 my-2" placeholder="Enter reason for deletion"></textarea>
                    <div className="modal-action">
                        <button className="btn bg-red-300 hover:bg-red-500 text-white" onClick={handleDelete}>Delete</button>
                        <button className="btn" onClick={() => document.getElementById('deleteModal').close()}>Cancel</button>
                    </div>
                </div>
            </dialog>
            {/* Modal for edit reservation */}
            <dialog id="editModal" className="modal">
                <div className="modal-box">
                    <h3 className="roboto-bold text-lg">Edit Reservation</h3>
                    <input type="datetime-local" className="input input-bordered w-full h-[40px] mt-[16px]" onChange={(e) => setEditData({...editData, date: e.target.value})} value={editData.date} />
                    <div className="mt-[16px]">
                        <select className="select select-bordered w-full h-[40px]" onChange={(e) => setEditData({...editData, package: e.target.value})} value={editData.package}>
                            <option value="">Select a Package</option>
                            <option value="Intimate Wedding">Intimate Wedding</option>
                            <option value="Seaside Elegance Wedding">Seaside Elegance Wedding</option>
                            <option value="Grand Wedding">Grand Wedding</option>
                        </select>
                    </div>
                    <div className="mt-[16px] mb-[24px]">
                        <textarea className="textarea textarea-bordered w-full h-[162px]" placeholder="Tell us anything more that can help! (Optional)" onChange={(e) => setEditData({...editData, notes: e.target.value})} value={editData.notes}></textarea>
                    </div>
                    <div className="modal-action">
                        <button className="btn bg-[#A19E96] hover:bg-[#576250] text-white" onClick={handleEditModalSave}>Save</button>
                        <button className="btn" onClick={() => document.getElementById('editModal').close()}>Cancel</button>
                    </div>
                </div>
            </dialog>
            <Footer />
        </div>
    );
}
