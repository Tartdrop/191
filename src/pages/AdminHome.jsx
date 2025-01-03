import React, { useState, useEffect } from 'react';
import "../styles/Search.css";
import { Link, useParams } from 'react-router-dom';
import HomeFooter from '../components/HomeFooter';
import HomeNavbar from '../components/HomeNavbar';
import DoctorForApproval from '../components/DoctorsForApproval';
import Popup from '../components/Popup'
import avatar00 from '../images/defaultIcon.png';
import avatar01 from '../assets/DoctorIcons/Icon01.png';
import avatar02 from '../assets/DoctorIcons/Icon02.png';
import avatar03 from '../assets/DoctorIcons/Icon03.png';
import avatar04 from '../assets/DoctorIcons/Icon04.png';
import avatar05 from '../assets/DoctorIcons/Icon05.png';
import avatar06 from '../assets/DoctorIcons/Icon06.png';
import avatar07 from '../assets/DoctorIcons/Icon07.png';
import avatar08 from '../assets/DoctorIcons/Icon08.png';
import avatar09 from '../assets/DoctorIcons/Icon09.png';
import avatar10 from '../assets/DoctorIcons/Icon10.png';
import avatar11 from '../assets/DoctorIcons/Icon11.png';
import avatar12 from '../assets/DoctorIcons/Icon12.png';
import avatar13 from '../assets/DoctorIcons/Icon13.png';
import avatar14 from '../assets/DoctorIcons/Icon14.png';
import patavatar01 from '../assets/PatientIcons/Avatar01.png';
import patavatar02 from '../assets/PatientIcons/Avatar02.png';
import patavatar03 from '../assets/PatientIcons/Avatar03.png';
import patavatar04 from '../assets/PatientIcons/Avatar04.png';
import patavatar05 from '../assets/PatientIcons/Avatar05.png';
import patavatar06 from '../assets/PatientIcons/Avatar06.png';
import patavatar07 from '../assets/PatientIcons/Avatar07.png';
import patavatar08 from '../assets/PatientIcons/Avatar08.png';
import patavatar09 from '../assets/PatientIcons/Avatar09.png';
import patavatar10 from '../assets/PatientIcons/Avatar10.png';
import patavatar11 from '../assets/PatientIcons/Avatar11.png';
import patavatar12 from '../assets/PatientIcons/Avatar12.png';
import patavatar13 from '../assets/PatientIcons/Avatar13.png';
import patavatar14 from '../assets/PatientIcons/Avatar14.png';
import patavatar15 from '../assets/PatientIcons/Avatar15.png';
import patavatar16 from '../assets/PatientIcons/Avatar16.png';
import patavatar17 from '../assets/PatientIcons/Avatar17.png';
import patavatar18 from '../assets/PatientIcons/Avatar18.png';
import PatientCards from '../components/Patients';

function AdminHome() {
  const { username } = useParams();
  const [message, setMessage] = useState('');
  const [approved] = useState('Verified by Admin')
  const [reject] = useState('Rejected by Admin')
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [isDeleteAccountVisible, setIsDeleteAccountVisible] = useState(false);
  const [doctors, setDoctors] = useState([
    {
      doctorId: '',
      firstName: '',
      lastName: '',
      contactNumber: '',
      specialization: '',
      credentials: '',
      email: '',
      prcID: '',
      profilePicture: '',
      approvalStatus: '',
      deletionStatus: ''
    }]);

  const [patients, setPatients] = useState([
    {
      patientId: '',
      firstName: '',
      lastName: '',
      contactNumber: '',
      birthday: '',
      sex: '',
      email: '',
      philhealthId: '',
      seniorId: '',
      hmo: '',
      pwdId: '',
      profilePicture: '',
      deletionStatus: ''
    }]);

  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentDoctor, setCurrentDoctor] = useState('');
  const [currentPatient, setCurrentPatient] = useState('');
  const [schedules, setSchedules] = useState([
    {
      doctorUserId: '',
      clinicId: '',
      clinicName: '',
      clinicAddress: '',
      clinicNumber: '',
      scheduleDay: '',
      slots: '',
    }
  ]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState('')
  const [selectedProfile, setSelectedProfile] = useState('doctors'); // Default selected profile

  const handleDeleteAccount = () => {
    setIsDeleteAccountVisible(true);
  };

  const closeDeleteAccount = () => {
    setIsDeleteAccountVisible(false);
  };

  const handleProfileToggle = (profileType) => {
    setSelectedProfile(profileType);
    if (profileType === "patients") {
      fetchAllPatients(); // Assuming fetchAllPatients is a function you've defined
    }
  };

  useEffect(() => {
    const fetchLoggedInAdmin = async () => {
      try {
        const response = await fetch(`http://localhost:8080/admindetails/${username}`);
        if (response.ok) {
          setIsAdminLoggedIn(true);
        } else {
          setIsAdminLoggedIn(false);
        }
      } catch (error) {
        setIsAdminLoggedIn(false);
      }
    };

    fetchLoggedInAdmin();
  }, [username]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch('http://localhost:8080/schedules');

        if (!response.ok) {
          throw new Error('Failed to fetch schedules');
        }

        const schedulesData = await response.json();
        const formattedSchedules = schedulesData.map((schedulesData) => ({
          doctorUserId: schedulesData.doctorUserId,
          clinicId: schedulesData.clinicId,
          clinicName: schedulesData.clinic.name,
          clinicAddress: schedulesData.clinic.address,
          clinicNumber: schedulesData.clinic.officeNumber,
          scheduleDay: schedulesData.scheduleDay,
          slots: schedulesData.slots,
        }));

        setSchedules(formattedSchedules);

      } catch (error) {
        console.error('Error fetching schedules:', error.message);
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await fetch('http://localhost:8080/allusers');

        if (response.ok) {
          const data = await response.json();
          const formattedDoctors = data.map((doctorData) => ({
            doctorId: doctorData.userId,
            firstName: `Dr. ${doctorData.user.firstName}`,
            lastName: doctorData.user.lastName,
            contactNumber: doctorData.user.contactNumber,
            specialization: doctorData.specialization,
            credentials: doctorData.credentials,
            profilePicture: doctorData.user.avatar,
            prcId: doctorData.prcId,
            email: doctorData.user.email,
            approvalStatus: doctorData.approvalStatus,
            deletionStatus: doctorData.user.deletionStatus

          }));

          setDoctors(formattedDoctors);
        } else {
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllDoctors();
  }, []);

  const fetchAllPatients = async () => {
    try {
      const response = await fetch('http://localhost:8080/allpatients');

      if (response.ok) {
        const data = await response.json();
        const formattedPatients = data.map((patientData) => ({
          patientId: patientData.userId,
          firstName: patientData.user.firstName,
          lastName: patientData.user.lastName,
          contactNumber: patientData.user.contactNumber,
          birthday: patientData.user.birthday,
          sex: patientData.user.sex,
          email: patientData.user.email,
          philhealthId: patientData.philhealthId,
          seniorId: patientData.seniorId,
          hmo: patientData.hmo,
          pwdId: patientData.pwdId,
          profilePicture: patientData.user.avatar,
          deletionStatus: patientData.user.deletionStatus

        }));

        setPatients(formattedPatients);
      } else {
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const setDisplayedAvatars = (avatar) => {
    const avatarImports = {
      'avatar01': avatar01,
      'avatar02': avatar02,
      'avatar03': avatar03,
      'avatar04': avatar04,
      'avatar05': avatar05,
      'avatar06': avatar06,
      'avatar07': avatar07,
      'avatar08': avatar08,
      'avatar09': avatar09,
      'avatar10': avatar10,
      'avatar11': avatar11,
      'avatar12': avatar12,
      'avatar13': avatar13,
      'avatar14': avatar14,
      'patavatar01': patavatar01,
      'patavatar02': patavatar02,
      'patavatar03': patavatar03,
      'patavatar04': patavatar04,
      'patavatar05': patavatar05,
      'patavatar06': patavatar06,
      'patavatar07': patavatar07,
      'patavatar08': patavatar08,
      'patavatar09': patavatar09,
      'patavatar10': patavatar10,
      'patavatar11': patavatar11,
      'patavatar12': patavatar12,
      'patavatar13': patavatar13,
      'patavatar14': patavatar14,
      'patavatar15': patavatar15,
      'patavatar16': patavatar16,
      'patavatar17': patavatar17,
      'patavatar18': patavatar18
    };

    // Set selectedAvatar using the corresponding import
    setSelectedAvatar(avatarImports[avatar] || avatar00);
  };

  useEffect(() => {
    // Set displayed avatars based on the doctor's avatar value and selected profile type
    if (selectedProfile === 'doctors') {
      setDisplayedAvatars(currentDoctor.profilePicture);
    } else if (selectedProfile === 'patients') {
      setDisplayedAvatars(currentPatient.profilePicture);
    }
  }, [selectedProfile, currentDoctor.profilePicture, currentPatient.profilePicture]);

  const [uniqueClinics, setUniqueClinics] = useState([]);

  const getDoctorClinics = (doctorId) => {
    // Filter schedules based on the doctorId
    const doctorSchedules = schedules.filter((schedule) => schedule.doctorUserId === doctorId);

    // Extract unique clinic IDs
    const uniqueClinicIds = Array.from(new Set(doctorSchedules.map((schedule) => schedule.clinicId)));

    // Create an array of objects for each unique clinic ID
    const uniqueClinicInfo = uniqueClinicIds.map((clinicId) => {
      const clinicSchedules = doctorSchedules.filter((schedule) => schedule.clinicId === clinicId);
      const clinicName = clinicSchedules[0]?.clinicName || ''; // Get the clinic name from the first schedule
      const clinicAddress = clinicSchedules[0]?.clinicAddress || '';
      const clinicNumber = clinicSchedules[0]?.clinicNumber || '';
      const scheduleDays = Array.from(new Set(clinicSchedules.map((schedule) => schedule.scheduleDay)));

      return {
        clinicId,
        clinicName,
        clinicAddress,
        clinicNumber,
        scheduleDays,
      };
    });

    // Set the extracted information in the component state
    setUniqueClinics(uniqueClinicInfo);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:8080/adminlogout/${username}`, {
        method: 'POST',
      });

      if (response.status === 200) {
        setMessage('Logged out successfully');
        window.location.href = '/';
      } else if (response.status === 401) {
        setMessage('No user is currently logged in');
      } else {
        setMessage('An error occurred');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  const handleApprovalSubmit = async (doctorId) => {
    try {
      const url = `http://localhost:8080/approval?userId=${doctorId}&approvalStatus=${approved}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        const data = await response.text();
        setResult(data);
      } else {
        setResult('Error submitting approval');
      }
    } catch (error) {
      console.error('Error submitting approval:', error);
      setResult('Error submitting approval');
    }
  };

  const handleRejectSubmit = async (doctorId) => {
    try {
      const url = `http://localhost:8080/approval?userId=${doctorId}&approvalStatus=${reject}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        const data = await response.text();
        setResult(data);
      } else {
        setResult('Error submitting approval');
      }
    } catch (error) {
      console.error('Error submitting approval:', error);
      setResult('Error submitting approval');
    }
  };

  const closePopup = () => {
    // Close the popup
    setPopupVisibility(false);
  };

  //Delete user
  const handleDeleteUser = async () => {
    const userId = selectedProfile === 'patients'
      ? currentPatient.patientId
      : selectedProfile === 'doctors'
        ? currentDoctor.doctorId
        : '';
    try {
      const response = await fetch(`http://localhost:8080/${selectedProfile}?userId=${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('User deleted successfully');
        window.location.reload();
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  const handleReview = (doctorId) => {
    // Set the currentDoctor state based on the doctorId
    setCurrentDoctor(doctors.find((doctor) => doctor.doctorId === doctorId) || {});
    try {
      // Call getDoctorClinics with the currentDoctor's doctorId
      getDoctorClinics(doctorId);

      // If getDoctorClinics was successful, set the Popup visibility to true
      setPopupVisibility(true);
      setResult('');
    } catch (error) {
      // Handle the error as needed
      console.error('Error fetching doctor clinics:', error);
    }
  };

  const handleCheck = (patientId) => {
    // Set the currentDoctor state based on the doctorId
    setCurrentPatient(patients.find((patient) => patient.patientId === patientId) || {});
    try {
      setPopupVisibility(true);
      setResult('');
    } catch (error) {
      // Handle the error as needed
      console.error('Error fetching doctor clinics:', error);
    }
  };

  if (!isAdminLoggedIn) {
    return (
      <div>
        <HomeNavbar />
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>Admin is not logged in.</h1>
          <Link to="/adminlog"><button>Login</button></Link>
        </div>
        <div style={{ bottom: "0", position: "fixed" }}>
          <HomeFooter />
        </div>
      </div>

    );
  }

  const renderDoctorDetailsPopup = () => (
    <Popup trigger={isPopupVisible}>
      {isDeleteAccountVisible && (
        <Popup trigger={isDeleteAccountVisible}>
          <div style={{ textAlign: "center", marginBottom: "10px", fontSize: "20px", zIndex: -1 }}><b>Are you sure you want to delete your account?</b></div>

          <button onClick={handleDeleteUser} style={{ padding: 5, borderRadius: 10, width: "48.5%", textAlign: "center", marginTop: "10px", height: "40px", marginRight: "10px", backgroundColor: "#b22222" }} >Delete Account</button>
          <button className='cancel' onClick={closeDeleteAccount} style={{ padding: 5, borderRadius: 10, width: "48.5%", textAlign: "center", marginTop: "10px", height: "40px" }}>Cancel</button>
        </Popup>
      )}
     
      <form action="#" id="signin-form">
        <div style={{display: "flex", flexDirection: "row"}}>
          <h1 style={{}}>Doctor Details</h1>
          <h1 style={{  fontSize: "25px", color: "gray", cursor: "pointer", marginLeft: "9vw"  }} onClick={closePopup}>x</h1>

        </div>
        <div className="infield" style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '500px' }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            {selectedAvatar && (
              <img
                src={selectedAvatar}
                alt="Selected Avatar"
                style={{ width: "7vw", marginRight: ".5rem" }}
              />
            )}

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: "10px" }}>
                <h3>Doctor Name</h3>
                <input
                  type="text"
                  name="docName"
                  placeholder="Doctor Name"
                  style={{ width: "35vw", marginBottom: "0px", borderRadius: "10px" }}
                  value={`${currentDoctor.firstName} ${currentDoctor.lastName}`}
                  readOnly
                />
              </div>

              <div>
                <h3>PRC ID</h3>
                <input
                  type="text"
                  name="prcId"
                  placeholder="PRC ID"
                  style={{ width: "35vw", marginBottom: "0px", borderRadius: "10px" }}
                  value={currentDoctor.prcId}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column", marginRight: "1rem" }}>
                <h3>Doctor Credentials</h3>
                <input type="text" name="credentials" placeholder="Doctor Credentials" style={{ width: "17vw", borderRadius: "10px" }} value={currentDoctor.credentials} readOnly></input>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>Specialization</h3>
                <input type="text" name="specialization" placeholder="Specialization" style={{ width: "17vw", borderRadius: "10px" }} value={currentDoctor.specialization} readOnly></input>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column", marginRight: "1rem" }}>
                <h3>Email Address</h3>
                <input type="text" name="emailAddress" placeholder="Email Address" style={{ width: "17vw", borderRadius: "10px" }} value={currentDoctor.email} readOnly></input>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>Contact Number</h3>
                <input type="text" name="contactNumber" placeholder="Contact Number" style={{ width: "17vw", borderRadius: "10px" }} value={currentDoctor.contactNumber} readOnly></input>
              </div>
            </div>
          </div>

          <br></br>
          {uniqueClinics.map((clinic, index) => (
            <ul key={clinic.clinicId}>
              <div>
                <h2>{`Clinic ${String(index + 1).padStart(2, '0')}`}</h2>
              </div>
              <div>
                <h3>Clinic or Hospital Affiliation</h3>
                <input
                  type="text"
                  name="clinicName"
                  placeholder="Clinic or Hospital Affiliation"
                  value={clinic.clinicName}
                  readOnly
                  style={{ width: "35vw", borderRadius: "10px" }}
                ></input>
              </div>
              <div>
                <h3>Clinic Address</h3>
                <input
                  type="text"
                  name="clinicSched"
                  placeholder="Clinic Schedule"
                  value={clinic.clinicAddress}
                  readOnly
                  style={{ width: "35vw", borderRadius: "10px" }}
                ></input>
              </div>
              <div>
                <h3>Clinic Schedule</h3>
                <input
                  type="text"
                  name="clinicSched"
                  placeholder="Clinic Schedule"
                  value={clinic.scheduleDays}
                  readOnly
                  style={{ width: "35vw", borderRadius: "10px" }}

                ></input>
              </div>
              <br></br>
            </ul>
          ))}

          {currentDoctor.approvalStatus === "Verified by Admin" ? (
            <button
              type="button"
              style={{
                padding: 5,
                borderRadius: 0,
                width: "35vw", 
                textAlign: "center",
                marginTop: "10px",
                height: "40px",
                marginRight: "",
                backgroundColor: "#b22222",
                borderRadius: "10px" 
              }}
              onClick={handleDeleteAccount}>
              Delete Account
            </button>
          ) : (
            <React.Fragment>
              <button
                type='button'
                style={{
                  padding: 5,
                  borderRadius: 10,
                  width: "48.8%", // Adjust width as needed
                  textAlign: "center",
                  marginTop: "20px",
                  height: "40px",
                  marginRight: "10px",
                }}
                onClick={() => {
                  handleApprovalSubmit(currentDoctor.doctorId);
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth',
                  });
                }}
              >
                Approve Profile
              </button>
              <button
                type='button'
                className='cancel'
                style={{
                  padding: 5,
                  borderRadius: 10,
                  width: "48.9%", // Adjust width as needed
                  textAlign: "center",
                  marginTop: "20px",
                  height: "40px",
                }}
                onClick={() => {
                  handleRejectSubmit(currentDoctor.doctorId);
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth',
                  });
                }}
              >
                Reject Profile
              </button>
            </React.Fragment>
          )}
          <h4>{result}</h4>

        </div>

      </form>
    </Popup>
  );

  const renderPatientDetailsPopup = () => (

    <Popup trigger={isPopupVisible}>
      {isDeleteAccountVisible && (
        <Popup trigger={isDeleteAccountVisible}>
          <div style={{ textAlign: "center", marginBottom: "10px", fontSize: "20px", zIndex: -1 }}><b>Are you sure you want to delete your account?</b></div>

          <button onClick={handleDeleteUser} style={{ padding: 5, borderRadius: 10, width: "48.5%", textAlign: "center", marginTop: "10px", height: "40px", marginRight: "10px", backgroundColor: "#b22222" }} >Delete Account</button>
          <button className='cancel' onClick={closeDeleteAccount} style={{ padding: 5, borderRadius: 10, width: "48.5%", textAlign: "center", marginTop: "10px", height: "40px" }}>Cancel</button>
        </Popup>
      )}
    <form action="#" id="signin-form">
      <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{}}>Patient Details</h1>
        <h1 style={{ fontSize: "25px", color: "gray", cursor: "pointer", marginLeft: "9vw" }} onClick={closePopup}>x</h1>
      </div>



        <div className="infield" style={{ overflowY: 'auto', maxHeight: '500px', overflowX: "hidden" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            {selectedAvatar && (
              <img
                src={selectedAvatar}
                alt="Selected Avatar"
                style={{ float: "left", marginRight: "0.5rem", width: "7vw" }}
              />
            )}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: "10px" }}>
                <h3>Patient Name</h3>
                <input
                  type="text"
                  name="docName"
                  placeholder="Patient Name"
                  style={{ width: "25vw", marginBottom: "0px" , borderRadius: "10px"}}
                  value={`${currentPatient.firstName} ${currentPatient.lastName}`}
                  readOnly
                />
              </div>
              <div>
                <h3>Email Address</h3>
                <input type="text" name="email" placeholder="Email Address" style={{ width: "25vw", marginBottom: "0", borderRadius: "10px" }} value={currentPatient.email} readOnly></input>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column", marginRight: "20px" }}>
                <h3>Contact Number</h3>
                <input type="text" name="contactNumber" placeholder="Contact Number" style={{ width: "15.5vw", borderRadius: "10px"  }} value={currentPatient.contactNumber} readOnly></input>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>Birthday</h3>
                <input type="text" name="birthday" placeholder="Birthday" style={{ width: "15.5vw", borderRadius: "10px"  }} value={currentPatient.birthday} readOnly></input>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column", marginRight: "20px" }}>
                <h3>Sex</h3>
                <input type="text" name="sex" placeholder="Sex" style={{ width: "15.5vw", borderRadius: "10px"  }} value={currentPatient.sex} readOnly></input>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>Philhealth Id</h3>
                <input type="text" name="philhealthId" placeholder="Philhealth Id" style={{ width: "15.5vw", borderRadius: "10px"  }} value={currentPatient.philhealthId} readOnly></input>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column", marginRight: "20px" }}>
                <h3>Senior Id</h3>
                <input type="text" name="seniorId" placeholder="Senior Id" style={{ width: "15.5vw", borderRadius: "10px"  }} value={currentPatient.seniorId} readOnly></input>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>PWD Id</h3>
                <input type="text" name="pwdId" placeholder="PWD Id" style={{ width: "15.5vw", borderRadius: "10px"  }} value={currentPatient.pwdId} readOnly></input>
              </div>
            </div>
          </div>

          <div>
            <h3>HMO</h3>
            <input type="text" name="hmo" placeholder="HMO"  style={{ width: "32.5vw", borderRadius: "10px"  }} value={currentPatient.hmo} readOnly></input>
          </div>

          <div>
            <button
              type="button"
              style={{
                padding: 5,
                borderRadius: 10,
                width: "32.5vw",
                textAlign: "center",
                marginTop: "10px",
                height: "40px",
                marginRight: "10px",
                backgroundColor: "#b22222"
              }}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>
        </div>

      </form>
    </Popup>
  );

  return (
    <div className="search-container" id="container">
      <div id="navbar">
        <nav>
          <ul>
            <li style={{ float: 'left' }}>
              <Link to="/">
                <img
                  src={require('../images/DOC LOGO.png')}
                  alt="Doc Click Connect"
                  style={{ maxWidth: '100px', maxHeight: '40px', marginRight: '20px', marginLeft: '-50px' }}
                /></Link>
            </li>
            <li style={{ float: 'right' }}>
              <button onClick={handleLogout}>Log Out</button>
              <p>{message}</p>
            </li>
          </ul>
        </nav>
      </div>

      <div style={{ display: "block", width: "100%", marginTop: "2%", maxHeight: "88vh", overflowY: "auto"}}>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <br />
          <button
            onClick={() => handleProfileToggle('doctors')}
            className={`button-transition`}
            style={{
              padding: '10px 20px',
              marginLeft: '15px',
              background: selectedProfile === 'doctors' ? '#3498db' : '#fff',
              color: selectedProfile === 'doctors' ? '#fff' : '#333',
              border: '1px solid #3498db',
              borderRadius: '2px',
              cursor: 'pointer',
              width: '41vw',
              overflowX: "hidden" 
            }}
          >
            Doctor Profiles
          </button>
          <button
            onClick={() => handleProfileToggle('patients')}
            className={`button-transition`}
            style={{
              padding: '10px 20px',
              background: selectedProfile === 'patients' ? '#3498db' : '#fff',
              color: selectedProfile === 'patients' ? '#fff' : '#333',
              border: '1px solid #3498db',
              borderRadius: '2px',
              cursor: 'pointer',
              width: '41vw',
              overflowX: "hidden" 
            }}
          >
            Patient Profiles
          </button>
        </div>


        <div className="doctor-grid" style={{display: "flex", justifyContent: 'center', paddingLeft: "10rem", paddingRight: "10rem"}}>
          {selectedProfile === 'doctors' ? (
            <div className="doctor-grid" style={{}}>
              <div >
                <div className="verified-accounts">
                  <h2>Verified Accounts</h2>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                    {doctors
                      .filter((doctor) => doctor.approvalStatus === 'Verified by Admin' && doctor.deletionStatus === null)
                      .map((verifiedDoctor, index) => (
                        <DoctorForApproval
                          key={index}
                          doctor={verifiedDoctor}
                          onReview={() => handleReview(verifiedDoctor.doctorId)}
                        />
                      ))}
                  </div>

                </div>
                <div className="unverified-accounts">
                  <h2>Unverified Accounts</h2>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    {doctors
                      .filter((doctor) => doctor.approvalStatus !== 'Verified by Admin' && doctor.deletionStatus === null)
                      .map((unverifiedDoctor, index) => (
                        <DoctorForApproval
                          key={index}
                          doctor={unverifiedDoctor}
                          onReview={() => handleReview(unverifiedDoctor.doctorId)}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Render patient profiles
            patients
              .filter((patient) => patient.deletionStatus === null)
              .map((patient, index) => (
                <PatientCards key={index} patient={patient} onReview={() => handleCheck(patient.patientId)} />
              ))
          )}
        </div>
      </div>
      <div style={{ bottom: "0", position: "fixed" }}>

        <HomeFooter />
      </div>

      {/* Popup */}

      <div>
        {selectedProfile === 'doctors' ? renderDoctorDetailsPopup() : null}
        {selectedProfile === 'patients' ? renderPatientDetailsPopup() : null}
      </div>
    </div>
  );
};


export default AdminHome;
