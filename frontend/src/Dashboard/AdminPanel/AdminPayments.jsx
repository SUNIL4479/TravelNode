import React, { useState, useEffect, useContext } from "react";
import { FiCheck, FiX, FiExternalLink, FiEye, FiSearch, FiFilter } from "react-icons/fi";
import { toast } from "react-toastify";
import BASE_URL, { BACKEND_URL } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";

const AdminPayments = () => {
  const { token } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("pending_verification");
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch(`${BASE_URL}/payment/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (result.success) {
        setPayments(result.data);
      } else {
        toast.error("Failed to fetch payments");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (paymentId, status) => {
    setProcessingId(paymentId);
    
    try {
      const res = await fetch(`${BASE_URL}/payment/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentId, status }),
      });

      const result = await res.json();
      
      if (res.ok) {
        toast.success(`Payment updated successfully!`);
        fetchPayments();
      } else {
        toast.error(result.message || "Action failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  const filteredPayments = filter === "all" 
    ? payments 
    : payments.filter(p => p.status === filter);

  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/600x400?text=No+Image";
    if (path.startsWith("http")) return path; // Cloudinary URL
    return `${BACKEND_URL}${path}`; // Local path
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="spinner"></div></div>;
  }

  return (
    <div className="bg-background min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-display-sm text-text-primary">Payment Verifications</h2>
            <p className="text-body-sm text-text-secondary">Verify manual payment proofs submitted by travelers.</p>
          </div>
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setFilter("pending_verification")}
              className={`px-4 py-2 rounded-xl text-body-sm font-semibold transition-all ${filter === "pending_verification" ? "bg-primary text-white shadow-sm" : "bg-white text-text-secondary hover:bg-forest-50"}`}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilter("paid")}
              className={`px-4 py-2 rounded-xl text-body-sm font-semibold transition-all ${filter === "paid" ? "bg-success text-white shadow-sm" : "bg-white text-text-secondary hover:bg-forest-50"}`}
            >
              Approved
            </button>
            <button 
              onClick={() => setFilter("failed")}
              className={`px-4 py-2 rounded-xl text-body-sm font-semibold transition-all ${filter === "failed" ? "bg-danger text-white shadow-sm" : "bg-white text-text-secondary hover:bg-forest-50"}`}
            >
              Rejected
            </button>
            <button 
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl text-body-sm font-semibold transition-all ${filter === "all" ? "bg-text-primary text-white shadow-sm" : "bg-white text-text-secondary hover:bg-forest-50"}`}
            >
              All
            </button>
          </div>
        </div>

        {filteredPayments.length === 0 ? (
          <div className="card text-center py-20 bg-forest-50/30 border-dashed border-2">
            <FiSearch className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-body-lg font-bold text-text-primary">No payments found</h3>
            <p className="text-body-sm text-text-secondary">No payments matching your current filter.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border-light bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-forest-50 border-b border-border-light">
                <tr>
                  <th className="px-6 py-4 text-caption font-bold text-text-muted uppercase">Trip / User</th>
                  <th className="px-6 py-4 text-caption font-bold text-text-muted uppercase">Amount</th>
                  <th className="px-6 py-4 text-caption font-bold text-text-muted uppercase">Transaction ID</th>
                  <th className="px-6 py-4 text-caption font-bold text-text-muted uppercase">Proof</th>
                  <th className="px-6 py-4 text-caption font-bold text-text-muted uppercase">Status</th>
                  <th className="px-6 py-4 text-right text-caption font-bold text-text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {filteredPayments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-forest-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-text-primary">{payment.bookingId?.tourName || "N/A"}</div>
                      <div className="text-caption text-text-secondary">{payment.userId?.username || "Unknown"}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">₹{payment.amount}</td>
                    <td className="px-6 py-4 font-mono text-caption">{payment.transactionId}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedImage(payment.paymentProof)}
                        className="btn-secondary !py-1.5 !px-3 !text-xs flex items-center gap-1.5"
                      >
                        <FiEye /> View Proof
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${
                        payment.status === "paid" ? "bg-success/10 text-success" : 
                        payment.status === "failed" ? "bg-danger/10 text-danger" : 
                        "bg-sky-100 text-sky-800"
                      }`}>
                        {payment.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {payment.status === "pending_verification" && (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleVerify(payment._id, "paid")}
                            disabled={processingId === payment._id}
                            className={`p-2 rounded-lg transition-all ${processingId === payment._id ? "bg-gray-100 text-gray-400" : "bg-success/10 text-success hover:bg-success hover:text-white"}`}
                            title="Approve"
                          >
                            {processingId === payment._id ? <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" /> : <FiCheck />}
                          </button>
                          <button 
                            onClick={() => handleVerify(payment._id, "failed")}
                            disabled={processingId === payment._id}
                            className={`p-2 rounded-lg transition-all ${processingId === payment._id ? "bg-gray-100 text-gray-400" : "bg-danger/10 text-danger hover:bg-danger hover:text-white"}`}
                            title="Reject"
                          >
                            <FiX />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden p-2 shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors">
              <FiX />
            </button>
            <img 
              src={getImageUrl(selectedImage)} 
              alt="Payment Proof" 
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/600x400?text=Proof+Image+Not+Found";
                toast.error("Image not found. It might be due to path configuration.");
              }}
            />
            <div className="p-4 bg-white flex justify-center">
               <a 
                href={getImageUrl(selectedImage)}
                target="_blank" 
                rel="noreferrer"
                className="btn-cta text-xs flex items-center gap-2"
              >
                <FiExternalLink /> Open in New Tab
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
