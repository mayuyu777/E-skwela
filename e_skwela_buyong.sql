-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2023 at 04:51 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_skwela_buyong`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` varchar(255) NOT NULL,
  `faculty_fk` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `type` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `faculty_fk`, `title`, `content`, `type`, `created_at`, `updated_at`) VALUES
('ewgwegweggrthreh', 'fhthrtrktyktrktye', 'Working Scholarship Program', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 3, '2023-06-03 23:44:44', '2023-06-04 14:49:36'),
('hhjyrkukrt', 'fhthrtrktyktrktye', 'HAHHAHA', 'gsfdgfdgdsg', 3, '2023-06-10 13:31:46', '2023-06-10 13:31:46'),
('rgergwergerwge', 'fhthrtrktyktrktye', 'Reminder on pending INC grades', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 3, '2023-06-04 14:44:44', '2023-06-04 14:49:36');

-- --------------------------------------------------------

--
-- Table structure for table `class_schedules`
--

CREATE TABLE `class_schedules` (
  `id` varchar(255) NOT NULL,
  `days` int(11) NOT NULL,
  `start` timestamp NULL DEFAULT NULL,
  `end` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_schedules`
--

INSERT INTO `class_schedules` (`id`, `days`, `start`, `end`) VALUES
('jukurkurk', 21, '2023-06-07 23:30:00', '2023-06-08 01:00:00'),
('rehehrthrh', 10, '2023-06-08 05:00:00', '2023-06-08 06:30:00'),
('uukutiulilty', 21, '2023-06-08 01:30:00', '2023-06-08 02:30:00'),
('yiltwacfewf', 10, '2023-06-08 02:30:00', '2023-06-08 04:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `class_sections`
--

CREATE TABLE `class_sections` (
  `id` varchar(255) NOT NULL,
  `section_fk` varchar(255) NOT NULL,
  `school_year_fk` varchar(255) NOT NULL,
  `class_advisor_fk` varchar(255) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_sections`
--

INSERT INTO `class_sections` (`id`, `section_fk`, `school_year_fk`, `class_advisor_fk`, `status`) VALUES
('bgntu,ir,trhe', 'hykr67i;tfdgd', 'wlkfjnofewf', 'fhthrtrktyktrktye', 1),
('weerhrjtykrk', 'yiukdhfhsdf', 'ty6utrttutr', 'fhthrtrktyktrktye', 1);

-- --------------------------------------------------------

--
-- Table structure for table `class_subjects`
--

CREATE TABLE `class_subjects` (
  `id` varchar(255) NOT NULL,
  `subject_fk` varchar(255) NOT NULL,
  `teacher_fk` varchar(255) NOT NULL,
  `class_section_fk` varchar(255) NOT NULL,
  `class_schedule_fk` varchar(255) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_subjects`
--

INSERT INTO `class_subjects` (`id`, `subject_fk`, `teacher_fk`, `class_section_fk`, `class_schedule_fk`, `status`) VALUES
('grkuilifef', 'ghtkyiliutltu', 'fhthrtrktyktrktye', 'weerhrjtykrk', 'uukutiulilty', 1),
('teykeyrewr', 'jykilyulsds', 'fhthrtrktyktrktye', 'bgntu,ir,trhe', 'jukurkurk', 1),
('ukuktykerwqrq', 'regerpgjempoirmpoqurq', 'fhthrtrktyktrktye', 'weerhrjtykrk', 'yiltwacfewf', 1),
('y5nu54u456i', 'Physicseijoithreh', 'fhthrtrktyktrktye', 'bgntu,ir,trhe', 'rehehrthrh', 1);

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `id` varchar(255) NOT NULL,
  `school_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `login_permission` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `suffix` varchar(5) DEFAULT NULL,
  `gender` int(11) NOT NULL,
  `birthdate` date NOT NULL,
  `age` int(11) NOT NULL,
  `contact_no` varchar(25) NOT NULL,
  `marital_status` int(11) NOT NULL,
  `position` varchar(255) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`id`, `school_id`, `password`, `role`, `login_permission`, `first_name`, `middle_name`, `last_name`, `suffix`, `gender`, `birthdate`, `age`, `contact_no`, `marital_status`, `position`, `status`) VALUES
('fhthrtrktyktrktye', '777', '$2a$10$r65bhF/xlFDHR8E.Gd/Amei9YzIx.eYJMsNW3BZVV2..zNayroy.q', 3, 1, 'Peaches', 'Invento', 'Sagnoy', NULL, 1, '2023-06-13', 45, '09772013342', 1, 'Teacher', 1);

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` varchar(255) NOT NULL,
  `academic_level` int(11) NOT NULL,
  `class_subject_fk` varchar(255) NOT NULL,
  `student_fk` varchar(255) NOT NULL,
  `school_year_fk` varchar(255) NOT NULL,
  `first_grading` float NOT NULL DEFAULT 0,
  `second_grading` float NOT NULL DEFAULT 0,
  `third_grading` float NOT NULL DEFAULT 0,
  `fourth_grading` float NOT NULL DEFAULT 0,
  `remarks` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id`, `academic_level`, `class_subject_fk`, `student_fk`, `school_year_fk`, `first_grading`, `second_grading`, `third_grading`, `fourth_grading`, `remarks`) VALUES
('kuyltyrewte', 9, 'teykeyrewr', 'geherjtyktrthwrhetw', 'wlkfjnofewf', 80, 85, 90, 80, ''),
('kuytyiltwewfwe', 8, 'ukuktykerwqrq', 'geherjtyktrthwrhetw', 'ty6utrttutr', 90, 81, 75, 0, ''),
('uykyuktrewrqe', 8, 'grkuilifef', 'geherjtyktrthwrhetw', 'ty6utrttutr', 89, 89, 89, 0, 'PASS');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` varchar(255) NOT NULL,
  `faculty_fk` varchar(255) DEFAULT NULL,
  `student_fk` varchar(255) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `mark_as_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `faculty_fk`, `student_fk`, `content`, `mark_as_read`, `created_at`) VALUES
('dwfqrt4h6hhhhhhhhhhhh45', NULL, 'geherjtyktrthwrhetw', 'hahahahah', 0, '2023-06-10 14:21:57'),
('gdfgdsfgdsgf', NULL, 'geherjtyktrthwrhetw', 'dfgsdfgfdsgs', 0, '2023-06-10 14:31:54'),
('gtwergrggwer', NULL, 'geherjtyktrthwrhetw', 'ergergergergerg', 0, '2023-06-10 14:31:54'),
('yjuykyuktyk', NULL, 'geherjtyktrthwrhetw', 'jfoiahowigheiogd', 0, '2023-06-10 14:26:39');

-- --------------------------------------------------------

--
-- Table structure for table `parent_guardian`
--

CREATE TABLE `parent_guardian` (
  `id` varchar(255) NOT NULL,
  `mother_full_name` varchar(255) DEFAULT NULL,
  `father_full_name` varchar(255) DEFAULT NULL,
  `guardian_full_name` varchar(255) NOT NULL,
  `mother_contact_no` varchar(255) DEFAULT NULL,
  `father_contact_no` varchar(255) DEFAULT NULL,
  `guardian_contact_no` varchar(255) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parent_guardian`
--

INSERT INTO `parent_guardian` (`id`, `mother_full_name`, `father_full_name`, `guardian_full_name`, `mother_contact_no`, `father_contact_no`, `guardian_contact_no`, `status`) VALUES
('097e446c-6a86-4003-b13f-375fe37cfa3b', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', '9772013342', '9772013342', '9772013342', 1),
('safsdggjjtyjtjty', 'Rose Sagnoy', 'Pelagio Sagnoy', 'Rose Sagnoy', '09772013342', '09772013342', '09772013342', 1);

-- --------------------------------------------------------

--
-- Table structure for table `returner`
--

CREATE TABLE `returner` (
  `id` varchar(255) NOT NULL,
  `last_grade_level_completed` int(11) NOT NULL,
  `last_school_attended` varchar(1000) NOT NULL,
  `last_school_year_completed` varchar(50) NOT NULL,
  `school_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `returner`
--

INSERT INTO `returner` (`id`, `last_grade_level_completed`, `last_school_attended`, `last_school_year_completed`, `school_id`) VALUES
('e11f762b-2930-41f9-80f8-ef9cc74e2a5f', 8, 'Hatdog School', '2021-2022', '12344567');

-- --------------------------------------------------------

--
-- Table structure for table `school_year`
--

CREATE TABLE `school_year` (
  `id` varchar(255) NOT NULL,
  `start` int(11) NOT NULL,
  `enrollment_open` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `school_year`
--

INSERT INTO `school_year` (`id`, `start`, `enrollment_open`, `status`) VALUES
('ty6utrttutr', 2022, 1, 0),
('wlkfjnofewf', 2023, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `academic_level` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `name`, `academic_level`, `status`) VALUES
('hykr67i;tfdgd', 'Lansones', 9, 1),
('yiukdhfhsdf', 'Kamunggay', 8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` varchar(255) NOT NULL,
  `school_id` varchar(255) DEFAULT NULL,
  `email` varchar(1000) NOT NULL,
  `parentguardian_fk` varchar(255) NOT NULL,
  `returner_fk` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `login_permission` int(11) NOT NULL,
  `LRN` varchar(255) DEFAULT NULL,
  `academic_level` int(11) NOT NULL,
  `is_enrolled` tinyint(1) DEFAULT NULL,
  `last_enrolled` date DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `gender` int(11) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `age` int(11) NOT NULL,
  `contact_no` varchar(255) DEFAULT NULL,
  `marital_status` int(11) NOT NULL,
  `psa_birth_cert` varchar(255) DEFAULT NULL,
  `place_of_birth` varchar(255) NOT NULL,
  `mother_tongue` varchar(255) NOT NULL,
  `indigenous` varchar(255) DEFAULT NULL,
  `4ps_no` varchar(255) DEFAULT NULL,
  `current_address` varchar(2000) NOT NULL,
  `permanent_address` varchar(2000) DEFAULT NULL,
  `suffix` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `school_id`, `email`, `parentguardian_fk`, `returner_fk`, `password`, `login_permission`, `LRN`, `academic_level`, `is_enrolled`, `last_enrolled`, `first_name`, `middle_name`, `last_name`, `gender`, `birthdate`, `age`, `contact_no`, `marital_status`, `psa_birth_cert`, `place_of_birth`, `mother_tongue`, `indigenous`, `4ps_no`, `current_address`, `permanent_address`, `suffix`) VALUES
('58e10119-6cab-42da-b8df-15b357e0d3de', '1111', 'sagnoynatalie@gmail.com', '097e446c-6a86-4003-b13f-375fe37cfa3b', 'e11f762b-2930-41f9-80f8-ef9cc74e2a5f', NULL, 0, 'dfgsfdgfdg', 8, 0, NULL, 'Natalie', 'Invento', 'Sagnoy', 1, '2023-06-01', 17, NULL, 1, 'fdsgfdgdf', 'gdsgfdgdg', 'fasdfsdf', 'fdhfdhds', 'hdfshfdhdfh', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, dhsdfhdsfhdsh, sadasd, fdsfsdf, Philippines, 6546', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, dhsdfhdsfhdsh, sadasd, fdsfsdf, Philippines, 6546', 'ggreger'),
('geherjtyktrthwrhetw', '18106334', 'sagnoy@gmail.com', 'safsdggjjtyjtjty', NULL, '$2a$10$r65bhF/xlFDHR8E.Gd/Amei9YzIx.eYJMsNW3BZVV2..zNayroy.q', 1, NULL, 7, NULL, NULL, 'Natalie', 'Invento', 'Sagnoy', 1, '2023-06-22', 23, '09772013342', 1, NULL, 'efwfwqgtthjt', 'sdgdsgsdg', NULL, NULL, 'wegwegwegsdgsgwrger', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_enrollment`
--

CREATE TABLE `student_enrollment` (
  `id` varchar(255) NOT NULL,
  `academic_level` int(11) NOT NULL,
  `class_section_fk` varchar(255) DEFAULT NULL,
  `student_fk` varchar(255) NOT NULL,
  `enrolled_by_fk` varchar(255) DEFAULT NULL,
  `school_year_fk` varchar(255) NOT NULL,
  `enrollment_status` int(11) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_enrollment`
--

INSERT INTO `student_enrollment` (`id`, `academic_level`, `class_section_fk`, `student_fk`, `enrolled_by_fk`, `school_year_fk`, `enrollment_status`, `status`) VALUES
('7c97384e-7cb6-4989-8eb3-d158b68e09b0', 8, NULL, '58e10119-6cab-42da-b8df-15b357e0d3de', NULL, 'ty6utrttutr', 0, 1),
('k554tqt32t', 9, 'bgntu,ir,trhe', 'geherjtyktrthwrhetw', 'fhthrtrktyktrktye', 'wlkfjnofewf', 4, 1),
('ltyryetwetqe', 8, 'weerhrjtykrk', 'geherjtyktrthwrhetw', 'fhthrtrktyktrktye', 'ty6utrttutr', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `academic_level` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `academic_level`, `status`) VALUES
('ghtkyiliutltu', 'Mathematics', 8, 1),
('jykilyulsds', 'Calculus I', 9, 1),
('Physicseijoithreh', 'Physics I', 9, 1),
('regerpgjempoirmpoqurq', 'English', 8, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `faculty_fk` (`faculty_fk`);

--
-- Indexes for table `class_schedules`
--
ALTER TABLE `class_schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class_sections`
--
ALTER TABLE `class_sections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section_fk` (`section_fk`),
  ADD KEY `school_year_fk` (`school_year_fk`),
  ADD KEY `class_advisor_fk` (`class_advisor_fk`);

--
-- Indexes for table `class_subjects`
--
ALTER TABLE `class_subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject_fk` (`subject_fk`),
  ADD KEY `teacher_fk` (`teacher_fk`),
  ADD KEY `class_section_fk` (`class_section_fk`),
  ADD KEY `class_schedule_fk` (`class_schedule_fk`) USING BTREE;

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `school_id` (`school_id`),
  ADD UNIQUE KEY `password` (`password`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_subject_fk` (`class_subject_fk`),
  ADD KEY `student_fk` (`student_fk`),
  ADD KEY `school_year_fk` (`school_year_fk`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `faculty_fk` (`faculty_fk`),
  ADD KEY `student_fk` (`student_fk`);

--
-- Indexes for table `parent_guardian`
--
ALTER TABLE `parent_guardian`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `returner`
--
ALTER TABLE `returner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_year`
--
ALTER TABLE `school_year`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `school_id` (`school_id`),
  ADD UNIQUE KEY `LRN` (`LRN`),
  ADD KEY `parentguardian_fk` (`parentguardian_fk`),
  ADD KEY `returner_fk` (`returner_fk`);

--
-- Indexes for table `student_enrollment`
--
ALTER TABLE `student_enrollment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_section_fk` (`class_section_fk`),
  ADD KEY `student_fk` (`student_fk`),
  ADD KEY `enrolled_by_fk` (`enrolled_by_fk`),
  ADD KEY `school_year_fk` (`school_year_fk`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`faculty_fk`) REFERENCES `faculty` (`id`);

--
-- Constraints for table `class_sections`
--
ALTER TABLE `class_sections`
  ADD CONSTRAINT `class_sections_ibfk_1` FOREIGN KEY (`section_fk`) REFERENCES `sections` (`id`),
  ADD CONSTRAINT `class_sections_ibfk_2` FOREIGN KEY (`school_year_fk`) REFERENCES `school_year` (`id`),
  ADD CONSTRAINT `class_sections_ibfk_3` FOREIGN KEY (`class_advisor_fk`) REFERENCES `faculty` (`id`);

--
-- Constraints for table `class_subjects`
--
ALTER TABLE `class_subjects`
  ADD CONSTRAINT `class_subjects_ibfk_1` FOREIGN KEY (`subject_fk`) REFERENCES `subjects` (`id`),
  ADD CONSTRAINT `class_subjects_ibfk_2` FOREIGN KEY (`teacher_fk`) REFERENCES `faculty` (`id`),
  ADD CONSTRAINT `class_subjects_ibfk_3` FOREIGN KEY (`class_section_fk`) REFERENCES `class_sections` (`id`),
  ADD CONSTRAINT `class_subjects_ibfk_4` FOREIGN KEY (`class_schedule_fk`) REFERENCES `class_schedules` (`id`);

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`class_subject_fk`) REFERENCES `class_subjects` (`id`),
  ADD CONSTRAINT `grades_ibfk_2` FOREIGN KEY (`student_fk`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `grades_ibfk_3` FOREIGN KEY (`school_year_fk`) REFERENCES `school_year` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`faculty_fk`) REFERENCES `faculty` (`id`),
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`student_fk`) REFERENCES `student` (`id`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`parentguardian_fk`) REFERENCES `parent_guardian` (`id`),
  ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`returner_fk`) REFERENCES `returner` (`id`);

--
-- Constraints for table `student_enrollment`
--
ALTER TABLE `student_enrollment`
  ADD CONSTRAINT `student_enrollment_ibfk_1` FOREIGN KEY (`class_section_fk`) REFERENCES `class_sections` (`id`),
  ADD CONSTRAINT `student_enrollment_ibfk_2` FOREIGN KEY (`student_fk`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `student_enrollment_ibfk_3` FOREIGN KEY (`enrolled_by_fk`) REFERENCES `faculty` (`id`),
  ADD CONSTRAINT `student_enrollment_ibfk_4` FOREIGN KEY (`school_year_fk`) REFERENCES `school_year` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
