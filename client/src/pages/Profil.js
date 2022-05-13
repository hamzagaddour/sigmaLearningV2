import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import { useSelector } from "react-redux";
import AdminProfil from "../components/profilComponents/adminListLearner/AdminProfil";
import TeacherProfil from "../components/profilComponents/teacher/TeacherProfil";
import LearnerProfil from "../components/profilComponents/Learner/LearnerProfil";

const Profil = () => {
  const uid = useContext(UidContext);
  const user = useSelector((state) => state.user);
  let isAdmin = user.isAdmin;
  let isTeacher = user.isTeacher;
  console.log(user);
  console.log(uid);

  return (
    <>
      {isAdmin ? (
        <AdminProfil />
      ) : isTeacher ? (
        <TeacherProfil />
      ) : (
        <LearnerProfil />
      )}
    </>
  );
};

export default Profil;
