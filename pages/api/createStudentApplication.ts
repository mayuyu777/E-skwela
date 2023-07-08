import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/client";
import { message } from "antd";
import { address_type } from "@/constants/address_type";
import { v4 as uuidv4 } from 'uuid';
import StudentInterface from "@/interfaces/StudentInterface";
import StudentEnrollmentInterface from "@/interfaces/StudentEnrollmentInterface";
import { student_enrollment_stat } from "@/constants/student_enrollment_stat";
import { enrollment_status } from "@/constants/enrollment_status";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const values = req.body;
  console.log(values)
  try {

    const SY = await prisma.school_year.findFirst({
      where: {
        start: parseInt(values.school_year)
      },
      select: {
        id: true
      }
    });
    
    const parentGuardian = await prisma.parent_guardian.create({
      data: {
        id: uuidv4(),
        mother_full_name: values.first_mother+" "+values.middle_mother+" "+values.last_mother,
        mother_contact_no: String(values.contact_mother),
        father_full_name: values.first_father+" "+values.middle_father+" "+values.last_father,
        father_contact_no: String(values.contact_father),
        guardian_full_name: values.first_guardian+" "+values.middle_guardian+" "+values.last_guardian,
        guardian_contact_no: String(values.contact_guardian),
        status: 1,
      },
      select: {
        id: true
      }
    });

    const returner = await prisma.returner.create({
      data: {
        id: uuidv4(),
        last_grade_level_completed: parseInt(values.last_grade),
        last_school_attended: values.last_school,
        last_school_year_completed: values.last_school_year,
        school_id: String(values.school_id),
      },
      select: {
        id: true
      }
    })

    const studentRes = await prisma.student.create({
      data: {
        id: uuidv4(),
        parentguardian_fk: parentGuardian.id,
        returner_fk: returner.id,
        email: values.email,
        LRN: values.lrn,
        first_name: values.firstname,
        middle_name: values.middlename,
        last_name: values.lastname,
        suffix: values.suffix,
        gender: parseInt(values.sex),
        birthdate: new Date(values.birthdate),
        age: parseInt(values.age),
        psa_birth_cert: values.psa,
        place_of_birth: values.birthplace,
        mother_tongue: values.mother_tongue,
        indigenous: values.ip,
        ps_no: values.four_ps,
        login_permission: 0,
        academic_level: parseInt(values.year_level),
        is_enrolled: false,
        contact_no: values.contact_no,
        marital_status: 1,
        current_address: values.house_no+", "+values.street+", "+values.barangay+", "+values.municipality+", "+values.province+", "+values.country+", "+values.zip,
        permanent_address: values.house_no_2 != ""? 
          ( String(values.house_no_2+", "+values.street_2+", "+values.barangay_2+", "+values.municipality_2+", "+values.province_2+", "+values.country_2+", "+values.zip_2))
          :
          ( String(values.house_no+", "+values.street+", "+values.barangay+", "+values.municipality+", "+values.province+", "+values.country+", "+values.zip)),
      },
      select:{
        id: true
      }
    })

    const result = await prisma.student_enrollment.create({ 
      data: {
        id: uuidv4(),
        academic_level: parseInt(values.year_level),
        school_year_fk: SY.id,
        enrollment_status: student_enrollment_stat.new,
        status: enrollment_status.active,
        student_fk: studentRes.id
    }});

    console.log(result)
    res.status(200).send({
      message:
        "Your application has been successfully submitted. Please check your email for updates regarding your application. Thank you.",
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: String(error), ok: false });
  }
}
