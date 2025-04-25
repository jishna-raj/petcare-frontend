import { useState, useEffect, useContext } from "react";
import {
  FaCalendarAlt, FaClock, FaUser, FaBriefcase, FaChevronLeft, FaChevronRight,
  FaAward, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheck, FaTimes, FaFlagCheckered,
  FaFileAlt, FaBars, FaTimesCircle, FaChevronDown, FaChevronUp
} from "react-icons/fa";
import "./EmployeeDashboard.css";
import {
  getAGroomerApi,
  getGroomerBookingsApi,
  postMessageApi,
  updateBookingStatusApi,
  updateGroomerApi
} from "../../services/allApi";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../services/serverUrl";
import GroomerUpdation from "./GroomerUpdation";
import { messageSentResponseContext } from "../../context/Contextshare";

const BookingCard = ({
  booking,
  expandedRequest,
  setExpandedRequest,
  handleStatusUpdate,
  isCompleted
}) => {
  const [processing, setProcessing] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleStatusChange = async (newStatus) => {
    try {
      setProcessing(true);
      setActionError(null);
      await handleStatusUpdate(booking._id, newStatus);
    } catch (error) {
      setActionError(error.message);
      console.error("Status change error:", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleContactOwner = (booking) => {
    if (booking.customer) {
      setSelectedUser({
        name: booking.customer.name,
        email: booking.customer.email,
        phone: booking.customer.phone,
        place: booking.customer.place
      });
      setShowUserModal(true);
    }
  };


  const UserDetailsModal = ({ user, onClose }) => {
    if (!user) return null;
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Customer Details</h3>
            <button className="modal-close" onClick={onClose}>
              <FaTimesCircle />
            </button>
          </div>
          <div className="modal-body">
            <div className="user-info-grid">
              <div className="user-info-item">
                <FaUser className="info-icon" />
                <div>
                  <h4>Name</h4>
                  <p>{user.name}</p>
                </div>
              </div>
              <div className="user-info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="user-info-item">
                <FaPhone className="info-icon" />
                <div>
                  <h4>Phone</h4>
                  <p>{user.phone}</p>
                </div>
              </div>
              <div className="user-info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <h4>Location</h4>
                  <p>{user.place}</p>
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="request-card">
      <div className="request-header"
        onClick={() => setExpandedRequest(expandedRequest === booking._id ? null : booking._id)}>
        <div className="request-info">
          <div className={`status-indicator status-${isCompleted ? 'completed' : booking.status.toLowerCase()}`} />
          <div>
            <h3 className="request-title">
              {booking.petDetails?.type || 'Pet'} - {booking.service}
            </h3>
            <p className="request-subtitle">
              {new Date(booking.schedule.date).toLocaleDateString()} at {booking.schedule.timeSlot?.start}
            </p>
          </div>
        </div>
        <div className="request-status">
          <span className="status-text">{booking.status}</span>
          {!isCompleted && (expandedRequest === booking._id ? <FaChevronUp /> : <FaChevronDown />)}
        </div>
      </div>

      {expandedRequest === booking._id && (
        <div className="request-details">
          <dl className="details-grid">
            <DetailItem label="Pet Type" value={booking.petDetails?.type} />
            <DetailItem label="Breed" value={booking.petDetails?.breed} />
            <DetailItem label="Size" value={booking.petDetails?.size} />
            <DetailItem label="Pet Count" value={booking.serviceDetails?.petsCount} />
            <DetailItem label="Payment" value={`$${booking.amount || '0'}`} isStrong />
            <DetailItem label="Payment Status" value={booking.paymentStatus} />
            <DetailItem label="Instructions" value={booking.instructions} fullWidth />
          </dl>

          {!isCompleted && (
            <div className="request-actions">
              {actionError && <div className="alert alert-danger">{actionError}</div>}

              {booking.status === 'Pending' && (
                <>
                  <button
                    className="btn btn-success"
                    disabled={processing}
                    onClick={() => handleStatusChange("Confirmed")}
                  >
                    {processing ? (
                      <span className="spinner-border spinner-border-sm" />
                    ) : (
                      <>
                        <FaCheck className="me-2" />
                        Accept
                      </>
                    )}
                  </button>
                  <button
                    className="btn btn-danger"
                    disabled={processing}
                    onClick={() => handleStatusChange("Cancelled")}
                  >
                    {processing ? (
                      <span className="spinner-border spinner-border-sm" />
                    ) : (
                      <>
                        <FaTimes className="me-2" />
                        Decline
                      </>
                    )}
                  </button>
                </>
              )}

              {booking.status === 'Confirmed' && (
                <button
                  className="btn btn-primary"
                  disabled={processing}
                  onClick={() => handleStatusChange("Completed")}
                >
                  {processing ? (
                    <span className="spinner-border spinner-border-sm" />
                  ) : (
                    <>
                      <FaFlagCheckered className="me-2" />
                      Mark Completed
                    </>
                  )}
                </button>
              )}

              <button
                className="btn btn-outline-secondary"
                onClick={() => handleContactOwner(booking)}
              >
                <FaEnvelope className="me-2" />
                Customer
              </button>
            </div>
          )}
        </div>
      )}

      {showUserModal && (
        <UserDetailsModal 
          user={selectedUser} 
          onClose={() => setShowUserModal(false)} 
        />
      )}
    </div>
  );
};



const DetailItem = ({ label, value, isStrong = false, fullWidth = false }) => (
  <div className={`detail-item ${fullWidth ? 'full-width' : ''}`}>
    <dt>{label}</dt>
    <dd>
      {isStrong ? <strong>{value || 'Not specified'}</strong> : (value || 'Not specified')}
    </dd>
  </div>
);

const ScheduleView = ({ currentMonth, handlePrevMonth, handleNextMonth, calendarBookings, formatDate }) => (
  <div className="tab-content">
    <h2 className="tab-title">My Schedule</h2>
    <div className="calendar-section">
      <div className="calendar-header">
        <h3 className="calendar-title">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="calendar-nav">
          <button className="calendar-nav-btn" onClick={handlePrevMonth}>
            <FaChevronLeft />
          </button>
          <button className="calendar-nav-btn" onClick={handleNextMonth}>
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="calendar-grid">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="calendar-day-header">{day}</div>
        ))}
        {Array.from({
          length: new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + 1,
            0
          ).getDate()
        }, (_, i) => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
          const dayBookings = calendarBookings.filter(b =>
            new Date(b.schedule.date).toDateString() === date.toDateString()
          );
          const hasCompleted = dayBookings.some(b => b.status === 'Completed');
          const hasConfirmed = dayBookings.some(b => b.status === 'Confirmed');

          return (
            <div key={i} className={`calendar-day ${hasCompleted ? 'calendar-day-completed' :
              hasConfirmed ? 'calendar-day-confirmed' : ''
              }`}>
              {i + 1}
              {(hasCompleted || hasConfirmed) && (
                <div className={`calendar-day-indicator ${hasCompleted ? 'completed-indicator' : 'confirmed-indicator'
                  }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
    <div className="appointments-section">
      <h3 className="section-title">
        {currentMonth.toLocaleString('default', { month: 'long' })} Appointments
      </h3>
      <div className="appointment-list">
        {calendarBookings
          .filter(b => {
            const bookingDate = new Date(b.schedule.date);
            return bookingDate.getMonth() === currentMonth.getMonth() &&
              bookingDate.getFullYear() === currentMonth.getFullYear();
          })
          .map(booking => (
            <div key={booking._id} className="appointment-item">
              <div className="appointment-icon">
                <FaClock />
              </div>
              <div className="appointment-info">
                <p className="appointment-title">
                  {new Date(booking.schedule.date).toLocaleDateString()} - {booking.schedule.timeSlot.start}
                </p>
                <p className="appointment-subtitle">
                  {booking.service} for {booking.petDetails?.type || 'Pet'}
                </p>
              </div>
              <div className={`appointment-status ${booking.status === 'Completed' ? 'status-badge-completed' : 'status-badge-confirmed'
                }`}>
                {booking.status}
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
);

const ProfileSection = ({ groomerData, handleSave, serverUrl }) => (
  <div className="tab-content">
    <h2 className="tab-title">My Profile</h2>
    <div className="profile-section">
      <div className="profile-sidebar">
        <div className="profile-card">
          <img
            src={groomerData.profilePicture
              ? `${serverUrl}/uploads/${groomerData.profilePicture}`
              : "/default-profile.png"}
            alt="Profile"
            className="profile-image"
          />
          <h3 className="profile-name">{groomerData.name}</h3>
          <div className="profile-position">Pet Care Professional</div>
          <GroomerUpdation groomerData={groomerData} onSave={handleSave} />
        </div>
      </div>
      <div className="profile-details">
        <dl className="details-grid">
          <DetailItem label="Email" value={groomerData.email} />
          <DetailItem label="Phone" value={groomerData.phone} />
          <DetailItem label="Address" value={groomerData.address} />
          <DetailItem label="Experience" value={`${groomerData.experience} years`} />
          <DetailItem
            label="Certifications"
            value={groomerData.certification?.join(", ") || "None"}
            fullWidth
          />
          <DetailItem label="Bio" value={groomerData.bio} fullWidth />
        </dl>
      </div>
    </div>
  </div>
);

export default function GroomerDashboard() {
  const [activeTab, setActiveTab] = useState("requests");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [groomerData, setGroomerData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [customers, setCustomer] = useState([])

  const { setMessagesent } = useContext(messageSentResponseContext);
  const navigate = useNavigate();

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    ));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    ));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedGroomer = sessionStorage.getItem("groomerDetails");
        if (!storedGroomer) throw new Error("No groomer data found. Please login again.");

        const groomerDetails = JSON.parse(storedGroomer);
        const groomerId = groomerDetails._id;
        if (!groomerId) throw new Error("Invalid groomer ID");

        const groomerResponse = await getAGroomerApi(groomerId);
        /* console.log(groomerResponse); */

        setGroomerData(groomerResponse.data);

        const bookingsResponse = await getGroomerBookingsApi(groomerId);
        console.log(bookingsResponse.data.data);

        if (bookingsResponse.data?.data) {
          setBookings(bookingsResponse.data.data);
          setCustomer(bookingsResponse.data.data.customer)
        }
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sendBookingNotification = async (booking, newStatus) => {
    try {
      const messageContent = {
        Confirmed: `Your ${booking.service} booking confirmed for ${formatDate(booking.schedule.date)}`,
        Cancelled: `Booking cancelled: ${booking.service} on ${formatDate(booking.schedule.date)}`,
        Completed: `Service completed: ${booking.service} on ${formatDate(booking.schedule.date)}`
      }[newStatus];

      const messageData = {
        bookingId: booking._id,
        userId: booking.userId,
        workerId: groomerData._id,
        content: messageContent,
        senderType: 'worker',
        statusUpdate: newStatus,
        relatedService: booking.service
      };

      const result = await postMessageApi(messageData);
      console.log(result);

      if (result.status === 201) {
        setMessagesent(result.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Notification error:", error);
      return false;
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      setLoading(true);
      const response = await updateBookingStatusApi(bookingId, { status: newStatus });

      if (response.status === 200) {
        const updatedBooking = bookings.find(b => b._id === bookingId);
        if (!updatedBooking) return;

        // Update availability
        const bookingDate = new Date(updatedBooking.schedule.date);
        const dayOfWeek = bookingDate.toLocaleDateString('en-US', { weekday: 'long' });
        const { start, end } = updatedBooking.schedule.timeSlot;

        const updatedAvailability = groomerData.availability.map(day => {
          if (day.day === dayOfWeek) {
            return {
              ...day,
              slots: day.slots.map(slot => {
                if (slot.start === start && slot.end === end) {
                  return {
                    ...slot,
                    status: newStatus === 'Confirmed' ? 'booked' :
                      newStatus === 'Completed' ? 'available' :
                        slot.status
                  };
                }
                return slot;
              })
            };
          }
          return day;
        });

        // Update state
        const updatedGroomer = { ...groomerData, availability: updatedAvailability };
        setGroomerData(updatedGroomer);
        sessionStorage.setItem("groomerDetails", JSON.stringify(updatedGroomer));

        // Update backend
        await updateGroomerApi(groomerData._id, { availability: updatedAvailability });

        // Update bookings
        setBookings(prev => prev.map(b =>
          b._id === bookingId ? { ...b, status: newStatus } : b
        ));

        // Send notification
        const notificationSuccess = await sendBookingNotification(updatedBooking, newStatus);
        if (!notificationSuccess) {
          throw new Error('Status updated but failed to send notification');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedData) => {
    try {
      setLoading(true);
      const groomerDetails = JSON.parse(sessionStorage.getItem("groomerDetails"));
      const response = await updateGroomerApi(groomerDetails._id, updatedData);
      if (response.status === 200) {
        const updatedGroomer = { ...groomerDetails, ...updatedData };
        setGroomerData(updatedGroomer);
        sessionStorage.setItem("groomerDetails", JSON.stringify(updatedGroomer));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("groomerToken");
    sessionStorage.removeItem("groomerDetails");
    navigate("/");
  };

  const activeBookings = bookings.filter(b => ['Pending', 'Confirmed'].includes(b.status));
  const completedBookings = bookings.filter(b => b.status === 'Completed');
  const cancelledBookings = bookings.filter(b => b.status === 'Cancelled');
  const calendarBookings = bookings.filter(b => ['Confirmed', 'Completed'].includes(b.status));

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return (
    <div className="error-message">
      {error} <Link to="/groomer-login">Go to Login</Link>
    </div>
  );
  if (!groomerData) return (
    <div className="error-message">
      Groomer not found <Link to="/groomer-login">Login Again</Link>
    </div>
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="container header-content">
          <h1 className="logo">Pet Groomer Dashboard</h1>
          <div className="user-actions">
            <div className="user-profile">
              <img
                src={groomerData.profilePicture
                  ? `${serverUrl}/uploads/${groomerData.profilePicture}`
                  : "/default-profile.png"}
                alt="Profile"
                className="profile-image-small"
              />
              <span>{groomerData.name}</span>
            </div>
            <Link to={'/groomer-review'}> <button className="btn btn-outline-success">Reviews</button></Link>
            <button className="btn btn-light" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </header>

      <div className="main-container container">
        <nav className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            <li className={`nav-item ${activeTab === "requests" ? "active" : ""}`}
              onClick={() => setActiveTab("requests")}>
              <FaFileAlt className="nav-icon" />
              <span>Grooming Requests</span>
            </li>
            <li className={`nav-item ${activeTab === "schedule" ? "active" : ""}`}
              onClick={() => setActiveTab("schedule")}>
              <FaCalendarAlt className="nav-icon" />
              <span>My Schedule</span>
            </li>
            <li className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}>
              <FaUser className="nav-icon" />
              <span>My Profile</span>
            </li>
          </ul>
          <div className="services-list">
            <h3 className="sidebar-heading">Services Offered</h3>
            <ul className="service-items">
              {groomerData.services?.map((service, index) => (
                <li key={index} className="service-item">
                  <span className="service-dot"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="content-area">
          {activeTab === "requests" && (
            <div className="tab-content">
              <h2 className="tab-title">Grooming Requests</h2>
              <div className="request-list">
                <div className="request-group">
                  <h3 className="request-group-title">Active Requests</h3>
                  {activeBookings.length === 0 ? (
                    <p className="no-requests">No active requests</p>
                  ) : (
                    activeBookings.map((booking) => (
                      <BookingCard
                        key={booking._id}
                        booking={booking}
                        expandedRequest={expandedRequest}
                        setExpandedRequest={setExpandedRequest}
                        handleStatusUpdate={handleStatusUpdate}
                      />
                    ))
                  )}
                </div>

                <div className="request-group">
                  <h3 className="request-group-title">Completed Requests</h3>
                  {completedBookings.length === 0 ? (
                    <p className="no-requests">No completed requests</p>
                  ) : (
                    completedBookings.map((booking) => (
                      <BookingCard
                        key={booking._id}
                        booking={booking}
                        expandedRequest={expandedRequest}
                        setExpandedRequest={setExpandedRequest}
                        isCompleted={true}
                      />
                    ))
                  )}
                </div>

                <div className="request-group">
                  <h3 className="request-group-title">Cancelled Requests</h3>
                  {cancelledBookings.length === 0 ? (
                    <p className="no-requests">No cancelled requests</p>
                  ) : (
                    cancelledBookings.map((booking) => (
                      <div key={booking._id} className="request-card">
                        <div className="request-header">
                          <div className="request-info">
                            <div className="status-indicator status-cancelled" />
                            <div>
                              <h3 className="request-title">
                                {booking.petDetails?.type || 'Pet'} - {booking.service}
                              </h3>
                              <p className="request-subtitle">
                                {formatDate(booking.schedule.date)} at {booking.schedule.timeSlot.start}
                              </p>
                            </div>
                          </div>
                          <div className="request-status">
                            <span className="status-text">{booking.status}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <ScheduleView
              currentMonth={currentMonth}
              handlePrevMonth={handlePrevMonth}
              handleNextMonth={handleNextMonth}
              calendarBookings={calendarBookings}
              formatDate={formatDate}
            />
          )}

          {activeTab === "profile" && (
            <ProfileSection
              groomerData={groomerData}
              handleSave={handleSave}
              serverUrl={serverUrl}
            />
          )}
        </div>
      </div>
    </div>
  );
}