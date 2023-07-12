-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2023 at 07:15 AM
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
('5445b896-5d55-4b96-b308-1f3e88bd97c1', 'fhthrtrktyktrktye', 'Practice Title 777', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, '2023-06-21 21:13:45', '2023-07-11 20:26:27'),
('ae79281e-d04f-49a6-9d53-c354eff0fe70', 'adminefwefwefe', 'wfewfwef', 'ewfwefwefw', 1, '2023-07-11 21:13:05', '2023-07-11 21:13:05'),
('ewgwegweggrthreh', 'fhthrtrktyktrktye', 'Working Scholarship Program 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 3, '2023-06-03 23:44:44', '2023-06-21 19:00:18'),
('rdtrhetjrtjr', 'rtrtejejerjerwhq', 'hreerhhe', 'rhrehreh', 2, '2023-06-17 05:37:43', '2023-06-17 05:37:43'),
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
('dfgdfgabgntu,ir,trhe', 'trhrththtrhrt', 'wlkfjnofewf', 'fhthrtrktyktrktye', 1),
('weerhrjtykrk', 'yiukdhfhsdf', 'ty6utrttutr', 'fhthrtrktyktrktye', 1),
('ytururutuyu', 'trhrththtrhrt', 'ty6utrttutr', 'rtrtejejerjerwhq', 1);

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
('adminefwefwefe', '123', '$2a$10$r65bhF/xlFDHR8E.Gd/Amei9YzIx.eYJMsNW3BZVV2..zNayroy.q', 3, 1, 'Admin', 'Invento', 'Sagnoy', NULL, 1, '2023-06-13', 45, '09772013342', 1, 'Admin', 1),
('fhthrtrktyktrktye', '777', '$2a$10$r65bhF/xlFDHR8E.Gd/Amei9YzIx.eYJMsNW3BZVV2..zNayroy.q', 2, 1, 'Peaches', 'Invento', 'Sagnoy', NULL, 1, '2023-06-13', 45, '09772013342', 1, 'Teacher', 1),
('rtrtejejerjerwhq', '888', 'wfewqgqew', 2, 1, 'Nat', 'Nat', 'Nat', NULL, 2, '2023-06-14', 45, '09772013342', 1, 'Teacher', 1);

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
('238537dd-949a-4d46-acf1-d214a0e1238e', 9, 'teykeyrewr', 'g777eherjtyktrthwrhetwtrgt', 'wlkfjnofewf', 11, 13, 15, 100, ''),
('2763e723-8861-4f50-adf3-36573e24bb44', 9, 'y5nu54u456i', 'geherjtyktrthwrhetw', 'wlkfjnofewf', 10, 20, 0, 0, ''),
('f902d920-9dcf-4c39-a0a7-05fe47b9bb3c', 9, 'y5nu54u456i', 'g777eherjtyktrthwrhetwtrgt', 'wlkfjnofewf', 90, 100, 80, 80, ''),
('kuyltyrewte', 9, 'teykeyrewr', 'geherjtyktrthwrhetw', 'wlkfjnofewf', 100, 90, 90, 100, ''),
('kuytyiltwewfwe', 8, 'ukuktykerwqrq', 'geherjtyktrthwrhetw', 'ty6utrttutr', 90, 81, 75, 79, ''),
('uykyuktrewrqe', 8, 'grkuilifef', 'geherjtyktrthwrhetw', 'ty6utrttutr', 89, 89, 89, 79, 'PASS');

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
('238ca10d-abe5-42f7-a797-23ea6ecd1684', NULL, 'geherjtyktrthwrhetw', 'Your Calculus I\'s grade have been updated', 1, '2023-06-29 19:03:37'),
('4a1c14a4-6f08-4edd-9e87-0408134ef1d3', NULL, 'geherjtyktrthwrhetw', 'Your undefined\'s grade have been updated', 1, '2023-06-29 18:53:53'),
('96191964-f39d-4bf3-9a98-685822515f76', NULL, 'geherjtyktrthwrhetw', 'Your Physics I grade have been updated by Peaches Sagnoy.', 1, '2023-06-29 22:25:30'),
('ac684ef8-9abd-4c2f-9c08-04f357e6737c', 'fhthrtrktyktrktye', 'geherjtyktrthwrhetw', 'Your Calculus I grade have been updated by Peaches Sagnoy.', 1, '2023-06-29 19:15:09'),
('c46b0bb9-4578-437f-9b52-224b95a5ad1e', NULL, 'geherjtyktrthwrhetw', 'Your Calculus I grade have been updated by Peaches Sagnoy.', 1, '2023-06-29 22:19:24'),
('d5a0e2c3-f369-4664-a5f0-847d84a595c8', 'fhthrtrktyktrktye', 'geherjtyktrthwrhetw', 'Your Calculus I grade have been updated by Peaches Sagnoy.', 1, '2023-06-29 19:16:13'),
('dwfqrt4h6hhhhhhhhhhhh45', NULL, 'geherjtyktrthwrhetw', 'hahahahah', 1, '2023-06-10 14:21:57'),
('gdfgdsfgdsgf', NULL, 'geherjtyktrthwrhetw', 'dfgsdfgfdsgs', 1, '2023-06-10 14:31:54'),
('gtwergrggwer', NULL, 'geherjtyktrthwrhetw', 'ergergergergerg', 1, '2023-06-10 14:31:54'),
('retrteac684ef8-9abd-4c2f-9c08-04f357e6737c', 'fhthrtrktyktrktye', NULL, 'ambot', 1, '2023-06-29 19:15:09'),
('yjuykyuktyk', NULL, 'geherjtyktrthwrhetw', 'jfoiahowigheiogd', 1, '2023-06-10 14:26:39');

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
('181b0788-20be-48a4-a1f1-abec3f0c9b69', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', '9772013342', '9772013342', '9772013342', 1),
('290d51fb-8465-47dc-8f4a-318ae949099f', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', '9772013342', '9772013342', '9772013342', 1),
('4122b958-b397-4183-afa3-3787b764c034', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', '9772013342', '9772013342', '9772013342', 1),
('46ea6b9c-da76-45f3-9a85-c5e96acdb3c6', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', '9772013342', '9772013342', '9772013341', 1),
('494cdf61-b749-404a-a6f6-efb1981d6dbc', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', '9772013342', '9772013342', '9772013342', 1),
('5c7b74eb-6082-4336-bc37-fa150e4289e3', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', '9772013342', '9772013342', '9772013342', 1),
('6164499e-d91d-4b63-b07e-493b70fbfead', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', '9772013342', '9772013342', '9772013342', 1),
('758641a4-b73a-47e7-81fb-7abde0b8e58f', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', 'regerge ergerg ereg', '9772013342', '9772013342', '9772013342', 1),
('7f25d09b-989a-4671-81c4-9c2de0c8b287', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', '9772013342', '9772013342', '9772013342', 1),
('9b7d4520-e391-49c5-ba06-854ebfe1b265', 'regerge ergerg ereg', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', '9772013342', '9772013342', '9772013342', 1),
('9cd373a6-192e-49bc-b0ac-43a4417c9922', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', 'regerge ergerg ereg', '9772013342', '9772013342', '9772013342', 1),
('9efaafa4-fe4b-47a9-90b9-64be2e6b8ce0', 'regerge ergerg ereg', 'Natalie Invento Sagnoy', 'regerge ergerg ereg', '9772013342', '9772013342', '9772013341', 1),
('c22e3042-99a0-412c-b2fa-de3c38e41915', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', 'regerge ergerg ereg', '9772013342', '9772013342', '9772013342', 1),
('d131e156-b342-4750-a2b1-f844787f5645', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', 'regerge ergerg ereg', '9772013342', '9772013342', '9772013342', 1),
('dba9d1ec-05c8-4645-b365-dabce8643f40', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', '9772013342', '9772013342', '9772013342', 1),
('ebd8257f-3b4f-4cce-bea8-282a0a5e9f17', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', '9772013342', '9772013342', '9772013342', 1),
('f331e70d-590d-4439-a2d4-a4a43d8467d2', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', 'Natalie Invento Sagnoy', '9772013342', '9772013342', '9772013342', 1),
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
('1dfd610e-769a-4f30-b8ee-37552b75ccb2', 8, 'Hatdog School', '2021-2022', '12344567'),
('1e133132-b5b0-44a9-8009-7f4ddf791662', 8, 'Hatdog School', 'sfsgdfgdgs', '12344567'),
('20fc6cf6-f09f-4c4b-ae84-9e0d6eeba843', 8, 'Hatdog School', '2021-2022', '12344567'),
('27c9f6a3-0492-4b49-98ce-8aeb7f062c58', 8, 'Hatdog School', '2021-2022', '12344567'),
('3da081ac-e48b-4e82-8fb7-e58b82afdd3c', 8, 'Hatdog School', '2021-2022', '12344567'),
('4d000ab4-ff53-4595-944c-ba3e31c39f64', 8, 'Hatdog School', '2021-2022', '12344567'),
('52893dc8-a8bd-4d58-9f54-47a4349d5106', 8, '2021-2022', '2021-2022', '12344567'),
('57eb1916-82d6-4829-8972-e24f30a3c70c', 8, 'Hatdog School', '2021-2022', '12344567'),
('6a301eea-9efb-475c-a5e5-07543d557390', 8, 'Hatdog School', '2021-2022', '12344567'),
('9d91b8a3-78c3-45b2-a949-e8a68ac474ac', 8, 'Hatdog School', '2021-2022', '12344567'),
('a881c999-0146-4d87-8f59-308302a38492', 8, 'Hatdog School', '2021-2022', '12344567'),
('b9e5d563-f693-4f8c-9cc9-1d50222caa0e', 8, 'Hatdog School', '2021-2022', '12344567'),
('c816399a-a160-4380-84d3-57de9c86f3d1', 8, 'Hatdog School', '2021-2022', '12344567'),
('d7de8ffa-cfec-4488-943c-35eb67a85bd5', 7, '143324', '324', '34235325235'),
('e05db499-ff31-4e35-8f5e-b3b90abed968', 8, 'Hatdog School', '2021-2022', '12344567'),
('e11f762b-2930-41f9-80f8-ef9cc74e2a5f', 8, 'Hatdog School', '2021-2022', '12344567'),
('e61f6a35-e1e5-4faa-aad1-bd173a10bd1a', 8, 'Hatdog School', '2021-2022', '12344567'),
('f7eaa374-286c-427f-ad65-b6a0e2a88dd0', 8, 'Hatdog School', '2021-2022', '12344567');

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
('trhrththtrhrt', 'Kalabasa', 7, 1),
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
('06a44067-28d0-4fb4-b1d9-c6a931050ffd', NULL, 'sagnoynatalie@gmail.com', '9b7d4520-e391-49c5-ba06-854ebfe1b265', 'a881c999-0146-4d87-8f59-308302a38492', NULL, 0, 'ddfgdfg', 8, 0, NULL, 'Natalie', 'Invento', 'Sagnoy', 1, '2023-07-12', 12, NULL, 1, 'sdgdfg', 'dfsgdfgfdsg', 'dffdh', 'jffg', 'dfgsdfsg', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, hgfhdfgh, sadasd, fdsfsdf, Philippines, 6546', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, hgfhdfgh, sadasd, fdsfsdf, Philippines, 6546', 'rgrerhtrh'),
('0faff6bf-2eed-4d25-a033-5b07abe66f2d', NULL, 'sagnoynatalie@gmail.com', '6164499e-d91d-4b63-b07e-493b70fbfead', '4d000ab4-ff53-4595-944c-ba3e31c39f64', NULL, 0, 'hfjgfh', 8, 0, NULL, 'Natalie', 'Invento', 'Sagnoy', 0, '2023-07-11', 12, NULL, 1, 'dgdh', 'fsddfdg', 'sdfsdfd', 'hggfhf', 'fdsfsdf', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, gfsgsdfg, sadasd, fdsfsdf, Philippines, 6546', 'undefined, undefined, undefined, undefined, undefined, undefined, undefined', 'qdwqfet'),
('12551cc8-f055-4da7-95db-de70faec5583', NULL, 'sagnoynatalie@gmail.com', 'c22e3042-99a0-412c-b2fa-de3c38e41915', '3da081ac-e48b-4e82-8fb7-e58b82afdd3c', NULL, 0, 'wefwefwef', 8, 0, NULL, 'Natalie', 'Invento', 'Sagnoy', 0, '2023-07-05', 12, NULL, 1, 'wefewfwefwefw', 'regergeg', 'ewfwefwef', 'ewfwefwef', 'fewfwefwe', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, wefwef, sadasd, fdsfsdf, Philippines, 6546', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, wefwef, sadasd, fdsfsdf, Philippines, 6546', 'ewfwefwf'),
('3637f4d1-598c-4be7-990b-d9c3e3e8e775', NULL, 'sagnoynatalie@gmail.com', 'f331e70d-590d-4439-a2d4-a4a43d8467d2', '9d91b8a3-78c3-45b2-a949-e8a68ac474ac', NULL, 0, 'sadasds', 9, 0, NULL, 'Natalie', 'Invento', 'Sagnoy', 1, '2023-06-28', 12, NULL, 1, 'adasdasd', 'sdasdadasd', 'fdsfafds', 'sdfsdf', 'cdscdsca', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, jkjgjgk, sadasd, fdsfsdf, Philippines, 6546', 'undefined, undefined, undefined, undefined, undefined, undefined, undefined', 'dqwdqwdq'),
('573d8a2d-bd85-4fc8-befb-372a7229474c', NULL, 'sagnoynatalie@gmail.com', '290d51fb-8465-47dc-8f4a-318ae949099f', 'e05db499-ff31-4e35-8f5e-b3b90abed968', NULL, 0, 'ergerg', 8, 0, NULL, 'Natalie', 'Invento', 'Sagnoy', 1, '2023-07-04', 12, NULL, 1, 'gergerg', 'ergergerg', 'ergerger', 'rgregeg', 'egergeg', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, ergergreg, sadasd, fdsfsdf, Philippines, 6546', 'undefined, undefined, undefined, undefined, undefined, undefined, undefined', 'ewhtrhrthge'),
('6356e3c7-032d-42ec-875b-ea4428bebc3f', NULL, 'sagnoynatalie@gmail.com', '9efaafa4-fe4b-47a9-90b9-64be2e6b8ce0', '1e133132-b5b0-44a9-8009-7f4ddf791662', NULL, 0, '43354', 7, 0, NULL, 'Natalie', 'Invento', 'Sagnoy', 0, '2023-07-11', 12, NULL, 1, 'fgdfgsdfgs', '31424efsdfaas', 'gfdgdfsgfds', 'fsdasdgfhghf', 'dfsafsdfsdf', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, dfghgfhf, sadasd, fdsfsdf, Philippines, 6546', 'rgerge, gergergeg, gfdgdfsgdfg, ergerge, eggreg, Philippines, 2324', 'grgrgergerg'),
('7a649c7b-f0df-4701-82d4-22232a31da70', NULL, 'sagnoynatalie@gmail.com', '7f25d09b-989a-4671-81c4-9c2de0c8b287', '6a301eea-9efb-475c-a5e5-07543d557390', NULL, 0, 'ytytktykrt', 8, 0, NULL, 'Natalie', 'Invento', 'Sagnoy', 0, '2023-06-29', 12, NULL, 1, 'hyhtyhyth', 'gdfgsdsg', 'rtgrtegr', 'ytjtyjr', 'gfdgfgd', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, jyytjtyjr, sadasd, fdsfsdf, Philippines, 6546', 'undefined, undefined, undefined, undefined, undefined, undefined, undefined', 'wqdwfewfreg'),
('7dc311ed-640c-4904-a6b5-a36ee78c11fd', NULL, 'sagnoynatalie@gmail.com', 'ebd8257f-3b4f-4cce-bea8-282a0a5e9f17', '20fc6cf6-f09f-4c4b-ae84-9e0d6eeba843', NULL, 0, 'qwfeweqfweqfrefer', 8, 0, NULL, 'Natalie', 'Invento', 'Sagnoy', 1, '2023-07-18', 12, NULL, 1, 'ewfwqfwef', 'fewqfewf', 'gregergerwgergerg', 'rgergwreg', 'egwergewg', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, egergeg, sadasd, fdsfsdf, Philippines, 6546', 'undefined, undefined, undefined, undefined, undefined, undefined, undefined', 'ergwreregrg'),
('be077322-99a6-459f-aeb5-5a1e38aa01d0', NULL, 'sagnoynatalie@gmail.com', '9cd373a6-192e-49bc-b0ac-43a4417c9922', '52893dc8-a8bd-4d58-9f54-47a4349d5106', NULL, 0, 'rgregeg', 7, 0, NULL, 'Natalie', 'Invento', 'Sagnoy', 0, '2023-06-27', 12, NULL, 1, 'qwdqwdwqf', 'qwdwqdqwd', 'ergergerg', 'dasdasASDASF', 'EWFWEFWEFWF', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, THRTHWHW, sadasd, fdsfsdf, Philippines, 6546', 'DFSDFDSFG, ERGEG, gtertjetjy, eherh, fewfwef, rhytjtu, 6546', 'qwdqwdwqd'),
('bfd6831b-4aba-42f1-ac1c-b5745406c498', NULL, 'sagnoynatalie@gmail.com', '46ea6b9c-da76-45f3-9a85-c5e96acdb3c6', '27c9f6a3-0492-4b49-98ce-8aeb7f062c58', NULL, 0, 'wefwefwe', 8, 0, NULL, 'Natalie', 'Invento', 'Sagnoy', 1, '2023-07-06', 12, NULL, 1, 'wfewefw', 'fwefwefq', 'fewfewf', 'wefwef', 'wefwefwef', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, wfewefwqf, sadasd, fdsfsdf, Philippines, 6546', 'undefined, undefined, undefined, undefined, undefined, undefined, undefined', 'eefqwefef'),
('d3dc939c-ba5e-4788-9b44-d5a1c5157329', NULL, 'sagoy.natalie@fullspeedtechnologies.com', '5c7b74eb-6082-4336-bc37-fa150e4289e3', 'd7de8ffa-cfec-4488-943c-35eb67a85bd5', NULL, 0, '', 8, 0, NULL, 'Natalie', 'Invento', 'Sagnoy', 2, '2023-07-06', 12, NULL, 1, '', 'rthrth', 'ddhdf', '', '', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, trrthtr, sadasd, fdsfsdf, Philippines, 6546', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, trrthtr, sadasd, fdsfsdf, Philippines, 6546', ''),
('e2de77c3-7d74-4a5f-997e-e63449eecd80', NULL, 'sagnoynatalie@gmail.com', '4122b958-b397-4183-afa3-3787b764c034', 'f7eaa374-286c-427f-ad65-b6a0e2a88dd0', NULL, 0, 'wjdoqidhqoiwdhqwrgqreg', 8, 0, NULL, 'Natalie', 'Invento', 'Sagnoy', 1, '2023-07-04', 12, NULL, 1, 'gergerg', 'ergergerg', 'ergerger', 'rgregeg', 'egergeg', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, ergergreg, sadasd, fdsfsdf, Philippines, 6546', 'undefined, undefined, undefined, undefined, undefined, undefined, undefined', 'ewhtrhrthge'),
('f83818f8-d691-45a7-a2d1-2b5738c87aca', NULL, 'sagnoynatalie@gmail.com', '181b0788-20be-48a4-a1f1-abec3f0c9b69', '1dfd610e-769a-4f30-b8ee-37552b75ccb2', NULL, 0, 'wegwegwe', 8, 0, NULL, 'Natalie', 'Invento', 'Sagnoy', 1, '2023-06-29', 12, NULL, 1, 'egwgeweg', 'wefqwefwqef', 'egwqgwe', 'wegwegwq', 'wgwgwq', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, wqgwqegweg, sadasd, fdsfsdf, Philippines, 6546', 'undefined, undefined, undefined, undefined, undefined, undefined, undefined', 'ewfqwef'),
('f8e8f127-060c-47eb-92b0-aa19698627e7', NULL, 'sagnoynatalie@gmail.com', '494cdf61-b749-404a-a6f6-efb1981d6dbc', '57eb1916-82d6-4829-8972-e24f30a3c70c', NULL, 0, 'gregehsfdsf', 8, 0, NULL, 'Natalie', 'Invento', 'Sagnoy', 1, '2023-07-04', 12, NULL, 1, 'gergerg', 'ergergerg', 'ergerger', 'rgregeg', 'egergeg', 'Unit 305 Building 3 Urban Deca Homes, Tipolo, Mandaue, Cebu, fdgfdg, ergergreg, sadasd, fdsfsdf, Philippines, 6546', 'undefined, undefined, undefined, undefined, undefined, undefined, undefined', 'ewhtrhrthge'),
('g777eherjtyktrthwrhetwtrgt', '111', 'sagnoy@gmail.com', 'safsdggjjtyjtjty', NULL, '$2a$10$r65bhF/xlFDHR8E.Gd/Amei9YzIx.eYJMsNW3BZVV2..zNayroy.q', 1, NULL, 7, NULL, NULL, 'Ariel', 'Invento', 'Sagnoy', 1, '2023-06-22', 16, '09772013342', 1, NULL, 'efwfwqgtthjt', 'sdgdsgsdg', NULL, NULL, 'wegwegwegsdgsgwrger', NULL, NULL),
('geherjtyktrthwrhetw', '18106334', 'sagnoy@gmail.com', 'safsdggjjtyjtjty', NULL, '$2a$10$r65bhF/xlFDHR8E.Gd/Amei9YzIx.eYJMsNW3BZVV2..zNayroy.q', 1, NULL, 7, NULL, NULL, 'Natalie', 'Invento', 'Sagnoy', 1, '2023-06-22', 16, '09772013342', 1, NULL, 'efwfwqgtthjt', 'sdgdsgsdg', NULL, NULL, 'wegwegwegsdgsgwrger', NULL, NULL);

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
('0061f034-f417-499a-bb37-ed3993a27a7a', 8, NULL, '573d8a2d-bd85-4fc8-befb-372a7229474c', NULL, 'ty6utrttutr', 0, 1),
('605b0e52-e9a6-4b8d-a328-f277bc84d95a', 9, NULL, '3637f4d1-598c-4be7-990b-d9c3e3e8e775', NULL, 'ty6utrttutr', 0, 1),
('6567gk554tqt32t', 9, 'bgntu,ir,trhe', 'g777eherjtyktrthwrhetwtrgt', 'fhthrtrktyktrktye', 'wlkfjnofewf', 4, 1),
('683a777f-75cb-4716-9b43-8f46dc200e7a', 8, NULL, 'bfd6831b-4aba-42f1-ac1c-b5745406c498', NULL, 'ty6utrttutr', 0, 1),
('7dd4fc1a-cccb-416a-938c-df95b6843977', 8, NULL, '0faff6bf-2eed-4d25-a033-5b07abe66f2d', NULL, 'wlkfjnofewf', 0, 1),
('7f5b5501-edfd-49cd-929c-1991e143da3d', 8, NULL, 'f83818f8-d691-45a7-a2d1-2b5738c87aca', NULL, 'wlkfjnofewf', 0, 1),
('d2a03281-a4f7-4302-ae05-98c4d280565d', 8, NULL, 'f8e8f127-060c-47eb-92b0-aa19698627e7', NULL, 'ty6utrttutr', 0, 1),
('e15e6564-904d-4c04-ad47-0585d076338e', 8, NULL, '06a44067-28d0-4fb4-b1d9-c6a931050ffd', NULL, 'wlkfjnofewf', 0, 1),
('e77cb431-5aa0-4145-a7f8-65c09d67db65', 8, NULL, '7a649c7b-f0df-4701-82d4-22232a31da70', NULL, 'ty6utrttutr', 0, 1),
('ea390f0d-ff74-4780-839f-cd85d0d62511', 7, NULL, '6356e3c7-032d-42ec-875b-ea4428bebc3f', NULL, 'ty6utrttutr', 0, 1),
('f6bfad9a-dc5a-44fb-b816-0f8e53c3eaba', 8, NULL, '7dc311ed-640c-4904-a6b5-a36ee78c11fd', NULL, 'ty6utrttutr', 0, 1),
('ff706aaf-6c8e-4f37-9f02-590587e6bad4', 8, NULL, 'e2de77c3-7d74-4a5f-997e-e63449eecd80', NULL, 'ty6utrttutr', 0, 1),
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
  ADD UNIQUE KEY `school_id` (`school_id`);

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
