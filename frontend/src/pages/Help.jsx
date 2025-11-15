import React, { useState } from 'react';
import {
  HelpCircle,
  Book,
  Users,
  MapPin,
  RadioTower,
  Shield,
  FileText,
  Search,
  X,
  ExternalLink,
  ArrowRight,
  MessageCircle
} from 'lucide-react';

const Help = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const helpSections = [
    {
      id: 'overview',
      title: 'Getting Started',
      icon: HelpCircle,
      color: 'bg-blue-500',
      description: 'Learn the basics of HMS and get started quickly with role-specific guides.',
      content: `
# Welcome to HMS Help Center

## Overview
The Hospital Management System (HMS) is a comprehensive platform for managing hospital operations including:
- Patient management
- Appointments & scheduling
- Prescriptions & pharmacy
- Laboratory & radiology
- Billing & invoicing
- Staff management
- Real-time location tracking
- User management & access control

## Quick Start Guide

### For Administrators
1. **Login** with your admin credentials
2. **User Management**: Create and manage staff accounts
3. **Beacon Manager**: Set up location tracking beacons
4. **Reports**: Generate operational reports

### For Doctors
1. **Dashboard**: View your appointments and patient list
2. **Patients**: Access patient records and medical history
3. **Prescriptions**: Write and manage prescriptions
4. **Location Tracker**: See which staff are available

### For Nurses
1. **Dashboard**: View assigned patients and tasks
2. **Patient Care**: Update vital signs and notes
3. **Appointments**: Manage appointment schedules

### For Receptionists
1. **Patient Registration**: Register new patients
2. **Appointments**: Schedule and manage appointments
3. **Billing**: Generate invoices and process payments

## Need More Help?
- Check specific sections in the cards
- Search for topics using the search bar
- Contact IT support for technical issues
      `
    },
    {
      id: 'user-management',
      title: 'User Management',
      icon: Users,
      color: 'bg-purple-500',
      description: 'Complete guide to creating users, assigning roles, and managing RBAC permissions.',
      content: `
# User Management & RBAC

## Overview
The User Management system allows administrators to create, edit, and manage all system users with role-based access control (RBAC).

## Accessing User Management
1. Login as **ADMIN**
2. Click **User Management** in the sidebar
3. Or navigate to: \`/dashboard/users\`

## Creating New Users

### Step-by-Step Guide:
1. Click **"Create New User"** button (top right)
2. Fill in **Personal Information**:
   - First Name *
   - Last Name *
   - Gender *
   - Date of Birth
   - Phone Number
   - Address

3. Set **Account Information**:
   - Email * (must be unique)
   - Password * (minimum 6 characters)

4. Configure **Professional Details**:
   - Role * (Doctor, Nurse, Admin, etc.)
   - Department
   - Specialization
   - Qualification (MD, MBBS, RN, etc.)
   - Experience (years)
   - Join Date

5. Set **Status**: ✓ Active User
6. Click **"Create User"**

## Available Roles

### ADMIN
- Full system access
- Create/manage all users
- Access all reports and data
- Configure system settings

### DOCTOR
- Patient care and medical records
- Prescriptions
- Appointments
- Laboratory and radiology orders

### NURSE
- Patient care (department-based)
- Vital signs and notes
- Ward management
- View prescriptions

### RECEPTIONIST
- Patient registration
- Appointment scheduling
- Billing and invoicing

### PHARMACIST
- Pharmacy inventory
- Prescription fulfillment
- Medicine management

### LAB_TECH
- Laboratory tests
- Test results entry
- Lab equipment management

### RADIOLOGIST
- Radiology orders
- Imaging reports
- PACS integration

## Editing Users
1. Find the user in the table
2. Click the **Edit** icon (pencil)
3. Modify information
4. Click "Update User"

## Deleting Users
1. Find the user
2. Click **Delete** icon (trash)
3. Confirm deletion
4. User will be marked as **inactive** (soft delete)

## Search & Filter
- **Search**: Type name, email, or employee code
- **Filter**: Select role from dropdown

## Security Features
- Password hashing (bcrypt)
- JWT token authentication (7-day expiry)
- Role validation on every request
- Department-based access control
- Audit trails (optional)

## API Endpoints

\`\`\`bash
# Create user
POST /api/employees
Authorization: Bearer <token>

# Get all users
GET /api/employees
Authorization: Bearer <token>

# Update user
PUT /api/employees/:id
Authorization: Bearer <token>

# Delete user
DELETE /api/employees/:id
Authorization: Bearer <token>
\`\`\`

## Troubleshooting

### Can't create user?
- Verify email is unique
- Password must be 6+ characters
- All required fields must be filled
- You must be logged in as ADMIN

### User not appearing in list?
- Refresh the page
- Check if user is inactive
- Clear search/filter

### Can't edit user?
- Verify you have ADMIN role
- Check backend API is running
- Check browser console for errors
      `
    },
    {
      id: 'beacon-tracking',
      title: 'Beacon Tracking Setup',
      icon: RadioTower,
      color: 'bg-green-500',
      description: 'Complete hardware setup guide for BLE beacon tracking system with installation instructions.',
      content: `
# Beacon Tracking System

## Overview
The Beacon Tracking System uses Bluetooth Low Energy (BLE) beacons to track staff locations in real-time throughout the hospital.

## How It Works

### System Architecture
1. **BLE Beacons** - Fixed at locations (ER, Cardiology, etc.)
2. **Staff Devices** - Mobile phones or BLE badges
3. **HMS Backend** - Receives and processes location signals
4. **Location Tracker** - Dashboard showing real-time locations

## Step 1: Hardware Setup

### What You Need
- **BLE Beacons**: Estimote, Kontakt.io, or compatible
- **Quantity**: 1 beacon per zone (5-20 for typical hospital)
- **Power**: Coin cell batteries (1-2 year life)

### Installation
1. **Choose Locations**:
   - Emergency Room entrance
   - Each department/ward
   - ICU, Operating rooms
   - Pharmacy, Laboratory
   - Administrative offices

2. **Mount Beacons**:
   - Height: 2-3 meters above ground
   - Clear line of sight
   - Away from metal obstacles
   - Secure mounting

3. **Configure Settings**:
   - Unique beacon code for each
   - Medium transmission power
   - 200-500ms broadcast interval

## Step 2: Register Beacons

### Using Beacon Manager UI
1. Login as **ADMIN**
2. Go to **Beacon Manager**
3. Click **"Add Beacon"**
4. Fill in:
   - Beacon Code: \`BEACON_ER_01\`
   - Name: "Emergency Room Beacon"
   - Location: "Emergency Room Entrance"
   - Floor: "Ground Floor"
   - Zone: "Emergency"
   - Active: ✓

### Using API
\`\`\`bash
# Get admin token
curl -X POST https://hms.alexandratechlab.com/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"admin@hospital.com","password":"admin123"}'

# Create beacon
curl -X POST https://hms.alexandratechlab.com/api/beacons \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "beaconCode": "BEACON_CARD_01",
    "name": "Cardiology Ward",
    "location": "Cardiology - 2nd Floor",
    "floor": "2nd Floor",
    "zone": "Cardiology",
    "isActive": true
  }'
\`\`\`

## Step 3: Assign Tracking Devices

### Assign Device to Staff
\`\`\`bash
# Assign mobile phone
curl -X POST https://hms.alexandratechlab.com/api/tracking-devices \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "userId": 11,
    "deviceType": "MOBILE_APP",
    "deviceId": "DEVICE_001",
    "deviceName": "Dr. Smith iPhone",
    "isActive": true
  }'
\`\`\`

### Device Types
- **MOBILE_APP**: Staff smartphone with HMS app
- **BLE_BADGE**: Dedicated BLE badge
- **TRACKER_DEVICE**: Standalone GPS/BLE tracker

## Step 4: Mobile App Setup

### If Using Mobile App:
1. Install HMS mobile app
2. Login with staff credentials
3. Enable Location & Bluetooth permissions
4. App automatically scans for beacons
5. Sends location signals to HMS API

### Location Signal Format:
\`\`\`bash
POST /api/locationtracker/signal
Authorization: Bearer <token>
Content-Type: application/json
{
  "userId": 11,
  "beaconCode": "BEACON_ER_01",
  "rssi": -65
}
\`\`\`

## Step 5: View Location Tracker

1. Login to HMS
2. Click **"Location Tracker"** in sidebar
3. View real-time staff locations
4. Filter by floor or zone
5. Search for specific staff

## Testing

### Send Test Signal:
\`\`\`bash
# Simulate staff location
curl -X POST https://hms.alexandratechlab.com/api/locationtracker/signal \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "userId": 11,
    "beaconCode": "BEACON_ER_01",
    "rssi": -65
  }'

# Check Location Tracker dashboard
# Should show staff at "Emergency Room"
\`\`\`

## Troubleshooting

### Beacons not detected?
- Check beacon batteries
- Verify Bluetooth is enabled
- Check location permissions
- Increase beacon transmission power

### Location not updating?
- Check internet connection
- Verify API endpoint accessible
- Check authentication token
- Review app logs

### Wrong location showing?
- Check beacon placement (too close?)
- Verify beacon codes are unique
- Check RSSI thresholds
- Reduce transmission power if overlapping

## Best Practices

1. **Placement**: Strategic locations only, 2-3 meters high
2. **Battery**: Check monthly, replace annually
3. **Privacy**: Inform staff, track during work hours only
4. **Security**: Secure API, encrypt data, limit access
5. **Maintenance**: Test monthly, update firmware, check mounting

## Quick Setup Script

Save and run this script:
\`\`\`bash
#!/bin/bash
# Setup 5 beacons quickly

TOKEN=$(curl -s https://hms.alexandratechlab.com/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"admin@hospital.com","password":"admin123"}' \\
  | jq -r '.token')

# Create Emergency Room beacon
curl -X POST https://hms.alexandratechlab.com/api/beacons \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "beaconCode": "BEACON_ER_01",
    "name": "Emergency Room",
    "location": "Emergency Room - Ground Floor",
    "floor": "Ground Floor",
    "zone": "Emergency",
    "isActive": true
  }'

echo "✅ Beacon created!"
\`\`\`

## Support

For issues:
- Check troubleshooting section
- Review API logs
- Test with BLE scanner app
- Contact IT support
      `
    },
    {
      id: 'location-tracker',
      title: 'Location Tracker',
      icon: MapPin,
      color: 'bg-orange-500',
      description: 'Learn how to use the Location Tracker dashboard to view real-time staff locations.',
      content: `
# Location Tracker Dashboard

## Overview
The Location Tracker shows real-time locations of all staff members who have been assigned tracking devices.

## Accessing Location Tracker

1. Login to HMS
2. Click **"Location Tracker"** in sidebar
3. Or navigate to: \`/dashboard/locationtracker\`

## Dashboard Features

### Staff List
- Shows all tracked staff members
- Displays current location (beacon name)
- Shows last seen timestamp
- Indicates online/offline status

### Filters
- **Floor**: View staff on specific floors
- **Zone**: Filter by department/area
- **Search**: Find specific staff member

### Real-Time Updates
- Locations update automatically
- Shows timestamp of last signal
- Highlights staff offline >15 minutes

## How Location Data Works

### Data Flow:
1. Staff device detects nearby beacon
2. Device sends signal to HMS API
3. System determines location based on beacon
4. Location Tracker updates in real-time

### Location Accuracy
- **High Accuracy** (1-3 meters): Strong signal (RSSI > -70)
- **Medium Accuracy** (3-10 meters): Medium signal (RSSI -70 to -85)
- **Low Accuracy** (10+ meters): Weak signal (RSSI < -85)

## Understanding Status

### Online (Green)
- Staff device is actively sending signals
- Last seen < 5 minutes ago

### Warning (Yellow)
- No signal for 5-15 minutes
- May be in dead zone or device off

### Offline (Red)
- No signal for > 15 minutes
- Device likely powered off or out of range

## Common Use Cases

### Find Available Staff
1. Open Location Tracker
2. Filter by department
3. See who's in which area
4. Contact staff in needed location

### Emergency Response
1. Check Location Tracker
2. Find nearest qualified staff
3. Page or call them directly

### Staff Accountability
1. View historical locations
2. Generate attendance reports
3. Track movement patterns

## Privacy & Permissions

### Who Can Access?
- **ADMIN**: View all staff locations
- **HR**: View all staff locations
- **RECEPTIONIST**: Limited access
- **STAFF**: Cannot see others' locations

### Privacy Settings
- Location tracking during work hours only
- Staff can request location history
- Data retention: 90 days (configurable)
- GDPR/HIPAA compliant

## Troubleshooting

### Staff not appearing?
- Verify staff has tracking device assigned
- Check staff user is active
- Ensure beacons are online
- Refresh the page

### Location not updating?
- Check staff device connectivity
- Verify beacons are powered on
- Check API server status
- Review recent LocationTracking logs

### Inaccurate locations?
- Check beacon placement
- Verify beacon codes are correct
- Adjust RSSI thresholds
- Calibrate beacons
      `
    },
    {
      id: 'rbac',
      title: 'Access Control (RBAC)',
      icon: Shield,
      color: 'bg-red-500',
      description: 'Understand role-based access control, permissions, and security features.',
      content: `
# Role-Based Access Control (RBAC)

## Overview
HMS uses Role-Based Access Control to ensure users only access features and data they're authorized for.

## How RBAC Works

### Authentication Flow:
1. User logs in with email/password
2. System validates credentials
3. Generates JWT token with user role
4. Token includes: user ID, role, department ID
5. Token expires after 7 days

### Authorization Check:
Every API request checks:
- ✓ Valid JWT token
- ✓ User's role
- ✓ Required permissions
- ✓ Department access (if applicable)

## Roles & Permissions

### ADMIN
**Access**: Full system access
**Capabilities**:
- Create/manage all users
- Access all departments
- View all reports and data
- Configure system settings
- Manage beacons and devices
- Access user management
- Override restrictions

### DOCTOR
**Access**: Clinical features
**Capabilities**:
- View/manage patients
- Write prescriptions
- Schedule appointments
- Order lab/radiology tests
- View medical records
- Access own department data
- **Cannot**: Create users, access other departments

### NURSE
**Access**: Department-based
**Capabilities**:
- View patients in assigned department
- Update vital signs
- View prescriptions
- Manage ward activities
- **Cannot**: Write prescriptions, access other departments

### RECEPTIONIST
**Access**: Front desk operations
**Capabilities**:
- Register patients
- Schedule appointments
- Generate invoices
- Process payments
- View basic patient info
- **Cannot**: View medical records, prescriptions

## Access Control Levels

### 1. Role-Based Access
Only specified roles can access endpoint

### 2. Department-Based Access
User can only access their department's data

### 3. Resource-Based Access
User can only access their own resources

## Security Features

### Password Security
- **Hashing**: bcrypt with 10 salt rounds
- **Minimum Length**: 6 characters
- **Storage**: Never stored in plain text
- **Reset**: Secure password reset flow

### Token Security
- **Type**: JWT (JSON Web Token)
- **Expiry**: 7 days
- **Secret**: Environment variable
- **Contents**: User ID, role, department ID
- **Validation**: On every API request

### API Security
- **Authentication**: Required for all endpoints
- **Authorization**: Role checked on every request
- **Rate Limiting**: Prevent abuse (optional)
- **CORS**: Configured for HMS domain only
- **HTTPS**: All traffic encrypted

## Troubleshooting

### Access Denied (403)?
1. Check your role has permission
2. Verify you're in correct department
3. Check resource ownership
4. Try logging out and back in

### Token Expired?
1. Login again to get new token
2. Token expires after 7 days
3. Logout and login to refresh

### Can't Access Feature?
1. Verify your role
2. Check sidebar menu
3. Contact admin if permission needed
      `
    },
    {
      id: 'api',
      title: 'API Documentation',
      icon: FileText,
      color: 'bg-indigo-500',
      description: 'Complete API reference with endpoints, authentication, and code examples.',
      content: `
# HMS API Documentation

## Base URL
Production: https://hms.alexandratechlab.com/api

## Authentication

All endpoints (except login/register) require authentication.

### Login
\`\`\`bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

### Using Token
\`\`\`bash
GET /patients
Authorization: Bearer <your-token>
\`\`\`

## Employee Management

### List All Employees
\`\`\`bash
GET /employees
Authorization: Bearer <token>
\`\`\`

### Create Employee
\`\`\`bash
POST /employees
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@hospital.com",
  "password": "SecurePass123",
  "phone": "+1234567890",
  "role": "NURSE",
  "departmentId": 1,
  "isActive": true
}
\`\`\`

### Update Employee
\`\`\`bash
PUT /employees/:id
Authorization: Bearer <token>
\`\`\`

### Delete Employee
\`\`\`bash
DELETE /employees/:id
Authorization: Bearer <token>
\`\`\`

## Beacon Management

### List Beacons
\`\`\`bash
GET /beacons
Authorization: Bearer <token>
\`\`\`

### Create Beacon
\`\`\`bash
POST /beacons
Authorization: Bearer <token>
Content-Type: application/json

{
  "beaconCode": "BEACON_ER_01",
  "name": "Emergency Room",
  "location": "ER - Ground Floor",
  "floor": "Ground Floor",
  "zone": "Emergency",
  "isActive": true
}
\`\`\`

## Location Tracking

### Send Location Signal
\`\`\`bash
POST /locationtracker/signal
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 11,
  "beaconCode": "BEACON_ER_01",
  "rssi": -65
}
\`\`\`

### Get Current Locations
\`\`\`bash
GET /locationtracker/current
Authorization: Bearer <token>
\`\`\`

## Error Responses

### 400 Bad Request
Invalid input data

### 401 Unauthorized
Invalid credentials

### 403 Forbidden
Insufficient permissions

### 404 Not Found
Resource not found

### 500 Server Error
Internal server error
      `
    },
    {
      id: 'faq',
      title: 'FAQ & Support',
      icon: MessageCircle,
      color: 'bg-pink-500',
      description: '40+ frequently asked questions and troubleshooting tips for common issues.',
      content: `
# Frequently Asked Questions

## General Questions

### Q: What is HMS?
**A:** HMS (Hospital Management System) is a comprehensive platform for managing hospital operations.

### Q: Who can access HMS?
**A:** Authorized hospital staff including administrators, doctors, nurses, receptionists, and others.

### Q: How do I reset my password?
**A:** Contact your system administrator or IT support.

### Q: What browsers are supported?
**A:** Chrome (recommended), Firefox, Safari, Edge

### Q: Is HMS mobile-friendly?
**A:** Yes! HMS is fully responsive.

## User Management

### Q: How do I create a new user?
**A:** Only ADMIN users can create users. Go to User Management → Click "Create New User".

### Q: What roles are available?
**A:** ADMIN, DOCTOR, NURSE, RECEPTIONIST, PHARMACIST, LAB_TECH, RADIOLOGIST, PATIENT.

### Q: Can I change a user's role?
**A:** Yes, ADMIN users can edit any user's role.

## Beacon Tracking

### Q: What are beacons?
**A:** Beacons are Bluetooth devices that help track staff locations.

### Q: How accurate is location tracking?
**A:** Typically 1-10 meters depending on placement.

### Q: Do I need a special device?
**A:** No, you can use your smartphone or a BLE badge.

## Security & Privacy

### Q: Is my data secure?
**A:** Yes, HMS uses:
- Encrypted HTTPS
- Password hashing
- JWT authentication
- Role-based access control

### Q: Who can see patient data?
**A:** Only authorized clinical staff in the relevant department.

### Q: Is HMS HIPAA compliant?
**A:** Yes, HMS follows HIPAA guidelines.

## Technical Issues

### Q: I can't login
**A:**
1. Verify email/password
2. Check if account is active
3. Clear browser cache
4. Contact IT support

### Q: Page loading slowly
**A:**
1. Check internet connection
2. Clear browser cache
3. Refresh the page

### Q: Features missing from dashboard
**A:** You only see features your role has access to.

## Contact Support

### IT Support
- **Email**: support@hospital.com
- **Phone**: Extension 5555
- **Hours**: 24/7

### Help Desk
- **Location**: IT Department, 1st Floor
- **Hours**: Mon-Fri, 8 AM - 5 PM
      `
    }
  ];

  const filteredSections = helpSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const HelpCard = ({ section }) => {
    const Icon = section.icon;
    return (
      <div
        onClick={() => setSelectedSection(section)}
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-200 overflow-hidden"
      >
        <div className={`${section.color} p-6`}>
          <Icon className="w-12 h-12 text-white mb-3" />
          <h3 className="text-xl font-bold text-white">{section.title}</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4 min-h-[60px]">{section.description}</p>
          <div className="flex items-center text-hospital-purple font-medium group-hover:gap-3 transition-all">
            <span>Read More</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    );
  };

  const ContentModal = ({ section, onClose }) => {
    if (!section) return null;

    const Icon = section.icon;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col my-8">
          {/* Header */}
          <div className={`${section.color} p-6 flex items-center justify-between sticky top-0 z-10`}>
            <div className="flex items-center gap-4">
              <Icon className="w-8 h-8 text-white" />
              <div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                <p className="text-white/80 text-sm mt-1">{section.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="prose prose-slate max-w-none">
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {section.content.split('\n').map((line, index) => {
                  // Headers
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">{line.substring(2)}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3">{line.substring(3)}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-semibold text-gray-800 mt-4 mb-2">{line.substring(4)}</h3>;
                  }

                  // Code blocks
                  if (line.startsWith('```')) {
                    return null;
                  }

                  // Lists
                  if (line.startsWith('- ')) {
                    return <li key={index} className="ml-6 text-gray-700 mb-1">{line.substring(2)}</li>;
                  }

                  // Bold
                  if (line.includes('**')) {
                    const parts = line.split('**');
                    return (
                      <p key={index} className="mb-2 text-gray-700">
                        {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900">{part}</strong> : part)}
                      </p>
                    );
                  }

                  // Regular paragraphs
                  if (line.trim()) {
                    return <p key={index} className="mb-3 text-gray-700 leading-relaxed">{line}</p>;
                  }

                  return <br key={index} />;
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Need more help?</span> Contact IT Support at Extension 5555
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-hospital-purple text-white rounded-lg hover:bg-hospital-purple/90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-hospital-purple/5 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <HelpCircle className="w-10 h-10 text-hospital-purple" />
            <h1 className="text-4xl font-bold text-gray-900">Help Center</h1>
          </div>
          <p className="text-gray-600 text-lg">Find answers, guides, and documentation for HMS</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search help topics, guides, or documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-hospital-purple focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Quick Links Banner */}
        <div className="bg-gradient-to-r from-hospital-purple to-purple-600 rounded-xl p-6 mb-8 text-white">
          <h3 className="text-xl font-bold mb-4">Quick Access</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/dashboard/users"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors"
            >
              <Users className="w-6 h-6" />
              <div>
                <div className="font-semibold">User Management</div>
                <div className="text-sm text-white/80">Create & manage users</div>
              </div>
            </a>
            <a
              href="/dashboard/beaconmanager"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors"
            >
              <RadioTower className="w-6 h-6" />
              <div>
                <div className="font-semibold">Beacon Manager</div>
                <div className="text-sm text-white/80">Configure beacons</div>
              </div>
            </a>
            <a
              href="/dashboard/locationtracker"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors"
            >
              <MapPin className="w-6 h-6" />
              <div>
                <div className="font-semibold">Location Tracker</div>
                <div className="text-sm text-white/80">Track staff locations</div>
              </div>
            </a>
          </div>
        </div>

        {/* Help Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredSections.map((section) => (
            <HelpCard key={section.id} section={section} />
          ))}
        </div>

        {/* No Results */}
        {filteredSections.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
            <p className="text-gray-500">Try searching with different keywords</p>
          </div>
        )}

        {/* Contact Support Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
          <div className="flex items-start gap-4">
            <MessageCircle className="w-8 h-8 text-blue-600 mt-1" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Still Need Help?</h3>
              <p className="text-blue-700 mb-4">Our IT support team is here to assist you 24/7</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-blue-600 font-medium">Email Support</div>
                  <div className="text-blue-900 font-semibold">support@hospital.com</div>
                </div>
                <div>
                  <div className="text-sm text-blue-600 font-medium">Phone Support</div>
                  <div className="text-blue-900 font-semibold">Extension 5555</div>
                </div>
                <div>
                  <div className="text-sm text-blue-600 font-medium">Help Desk</div>
                  <div className="text-blue-900 font-semibold">IT Dept, 1st Floor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Modal */}
      {selectedSection && (
        <ContentModal section={selectedSection} onClose={() => setSelectedSection(null)} />
      )}
    </div>
  );
};

export default Help;
