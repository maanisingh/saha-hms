-- Add tracking devices table to link staff with their BLE devices

CREATE TABLE IF NOT EXISTS TrackingDevice (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  deviceType ENUM('MOBILE_APP', 'BLE_BADGE', 'TRACKER') NOT NULL DEFAULT 'MOBILE_APP',
  deviceId VARCHAR(255) UNIQUE NOT NULL,
  deviceName VARCHAR(255),
  macAddress VARCHAR(17),
  isActive BOOLEAN DEFAULT true,
  lastSeen TIMESTAMP NULL,
  batteryLevel INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
  INDEX idx_user (userId),
  INDEX idx_device (deviceId),
  INDEX idx_active (isActive)
);

-- Add some sample tracking devices for our doctors
INSERT INTO TrackingDevice (userId, deviceType, deviceId, deviceName, macAddress, isActive)
VALUES 
  (4, 'MOBILE_APP', 'DEVICE_SMITH_001', 'Dr. Smith iPhone', 'AA:BB:CC:DD:EE:01', true),
  (5, 'BLE_BADGE', 'BADGE_JOHNSON_002', 'Dr. Johnson Badge', 'AA:BB:CC:DD:EE:02', true),
  (6, 'MOBILE_APP', 'DEVICE_WILLIAMS_003', 'Dr. Williams Android', 'AA:BB:CC:DD:EE:03', true);

-- View all staff with their tracking devices
SELECT 
  u.id,
  u.firstName,
  u.lastName,
  u.role,
  td.deviceType,
  td.deviceId,
  td.deviceName,
  td.isActive,
  td.lastSeen
FROM User u
LEFT JOIN TrackingDevice td ON u.id = td.userId
WHERE u.role IN ('DOCTOR', 'NURSE', 'EMPLOYEE');
