import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/client";
import { message } from "antd";
import { address_type } from "@/constants/address_type";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const values = req.body;
  try {
    const result = await prisma.applications.create({
      data: {
        year_level_to_enroll: parseInt(values?.year_level),
        school_yr_id: parseInt(values?.school_year),
        email: values.email,
        learner_info: {
          create: {
            LRN: values.lrn,
            first_name: values.firstname,
            middle_name: values.middlename,
            last_name: values.lastname,
            suffix: values.suffix,
            gender: values.sex,
            birthdate: new Date(values.birthdate),
            age: values.age,
            psa_birth_cert: values.psa,
            place_of_birth: values.birthplace,
            mother_tongue: values.mother_tongue,
            indigenous: values.ip,
            ps_no: values.four_ps,
          },
        },
        parent_guardian_info: {
          create: {
            mother_first_name: values.first_mother,
            mother_middle_name: values.middle_mother,
            mother_last_name: values.last_mother,
            mother_contact_no: String(values.contact_mother),
            father_first_name: values.first_father,
            father_middle_name: values.middle_father,
            father_last_name: values.last_father,
            father_contact_no: String(values.contact_father),
            guardian_first_name: values.first_guardian,
            guardian_middle_name: values.middle_guardian,
            guardian_last_name: values.last_guardian,
            guardian_contact_no: String(values.contact_guardian),
          },
        },
        returning_learner_info: {
          create: {
            last_grade_level_completed: values.last_grade,
            last_school_attended: values.last_school,
            last_school_year_completed: values.last_school_year,
            school_id: String(values.school_id),
          },
        },
      },
      select: {
        learner_info: true,
      },
    });

    if (values.house_no_2 != "") {
      const address = await prisma.address.createMany({
        data: [
          {
            learner_id: result.learner_info[0].learner_id,
            house_or_street: values.house_no,
            street_name: values.street,
            barangay: values.barangay,
            municipality: values.municipality,
            province: values.province,
            country: values.country,
            zip_code: String(values.zip),
            type: address_type.current,
          },
          {
            learner_id: result.learner_info[0].learner_id,
            house_or_street: values.house_no_2,
            street_name: values.street_2,
            barangay: values.barangay_2,
            municipality: values.municipality_2,
            province: values.province_2,
            country: values.country_2,
            zip_code: String(values.zip_2),
            type: address_type.permanent,
          },
        ],
      });
    } else {
      const address = await prisma.address.create({
        data: {
          learner_id: result.learner_info[0].learner_id,
          house_or_street: values.house_no,
          street_name: values.street,
          barangay: values.barangay,
          municipality: values.municipality,
          province: values.province,
          country: values.country,
          zip_code: String(values.zip),
          type: address_type.both,
        },
      });
    }

    res.status(200).send({
      message:
        "Your application has been successfully submitted. Please check your email for updates regarding your application. Thank you.",
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error, ok: false });
  }
}
