import ParentGuardianInterface from "./ParentGuardianInterface"
import ReturningLearnerInfoInterface from "./ReturningLearnerInfoInterface"

export default interface StudentInterface {
  id: string,
  school_id: string,
  email:string,
  LRN: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  suffix: string,
  gender: number,
  birthdate: string,
  age: number,
  psa_birth_cert: string,
  place_of_birth: string,
  mother_tongue: string,
  indigenous: string,
  ps_no: string,
  parentguardian_fk?: string,
  returner_fk?: string,
  login_permission: number,
  academic_level: number,
  is_enrolled: number,
  last_enrolled?: string,
  contact_no: string,
  marital_status: number,
  current_address: string,
  permanent_address: string,
  parent_guardian?: ParentGuardianInterface,
  returner?: ReturningLearnerInfoInterface,
}
  