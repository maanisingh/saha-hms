import React from 'react';
import { X, User, Mail, Phone, MapPin, Calendar, Briefcase, Shield, Building2, CheckCircle, XCircle } from 'lucide-react';

const ViewUserModal = ({ isOpen, user, onClose }) => {
  if (!isOpen || !user) return null;

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="p-2 bg-hospital-purple/10 rounded-lg">
        <Icon className="w-5 h-5 text-hospital-purple" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <p className="text-base font-medium text-gray-900">{value || 'N/A'}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <User className="w-6 h-6 text-hospital-purple" />
            User Details
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <div className="w-20 h-20 bg-hospital-purple/10 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-hospital-purple">
                {user.user?.firstName?.[0]}{user.user?.lastName?.[0]}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {user.user?.firstName} {user.user?.lastName}
              </h3>
              <p className="text-gray-600">{user.employeeCode}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                  user.role === 'DOCTOR' ? 'bg-blue-100 text-blue-700' :
                  user.role === 'NURSE' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {user.role}
                </span>
                {user.isActive ? (
                  <span className="flex items-center gap-1 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-600 text-sm">
                    <XCircle className="w-4 h-4" />
                    Inactive
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
            <div className="space-y-2">
              <InfoRow icon={Mail} label="Email" value={user.user?.email} />
              <InfoRow icon={Phone} label="Phone" value={user.user?.phone} />
              <InfoRow icon={MapPin} label="Address" value={user.user?.address} />
            </div>
          </div>

          {/* Professional Information */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h4>
            <div className="space-y-2">
              <InfoRow icon={Shield} label="Role" value={user.role} />
              <InfoRow icon={Building2} label="Department" value={user.department?.name} />
              <InfoRow icon={Briefcase} label="Specialization" value={user.specialization} />
              <InfoRow icon={Briefcase} label="Qualification" value={user.qualification} />
              <InfoRow icon={Calendar} label="Experience" value={user.experience ? `${user.experience} years` : 'N/A'} />
              <InfoRow icon={Calendar} label="Join Date" value={user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'} />
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
            <div className="space-y-2">
              <InfoRow icon={User} label="Gender" value={user.user?.gender} />
              <InfoRow icon={Calendar} label="Date of Birth" value={user.user?.dateOfBirth ? new Date(user.user.dateOfBirth).toLocaleDateString() : 'N/A'} />
            </div>
          </div>

          <div className="flex justify-end mt-6 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
