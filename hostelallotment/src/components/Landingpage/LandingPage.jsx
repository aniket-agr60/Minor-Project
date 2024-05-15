import React from "react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaHandsClapping } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { TypewriterEffect } from "../ui/typewriter-effect";
import axios from "axios";
import { GrAnnounce } from "react-icons/gr";
import { MdOutlineEventNote } from "react-icons/md";
import Navbar from "../navbar/Navbar";

function LandingPage() {
  const location = useLocation();
  const { name } = location.state || { name: "" };
  const { email } = location.state || { email: "" };
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showHostelInfo, setShowHostelInfo] = useState(true);
  const [showHostelInfo2, setShowHostelInfo2] = useState(false);
  const [showHostelInfo3, setShowHostelInfo3] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const toggleHostelInfo = () => {
    setShowHostelInfo(!showHostelInfo);
  };
  const toggleHostelInfo2 = () => {
    setShowHostelInfo2(!showHostelInfo2);
  };
  const toggleHostelInfo3 = () => {
    setShowHostelInfo3(!showHostelInfo3);
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleallotment = () => {
    localStorage.setItem("email", email);
  };
  const handlelogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/logout"
      );
      if (response.data) {
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };
  const addHostelAndRooms = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/hostel/addhostelandrooms"
      );
      console.log("Hostel and rooms added successfully:", response.data);
    } catch (error) {
      console.error("Error adding hostel and rooms:", error);
    }
  };
  return (
    <>
      <Navbar></Navbar>
      <section className={`${styles.hero}`}>
        <div className={`${styles.container1}`}>
          <div className={`${styles.temp}`}>
            {" "}
            <h2>Your one and only hostel support system platform is here!</h2>
            <br />
            <TypewriterEffect
              words={[
                { text: "Welcome" },
                { text: "to" },
                { text: "NITJ" },
                { text: "Hostel" },
              ]}
              className={styles["h1landing"]}
            />
            <a
              href="https://nitj.ac.in/index.html#campus-life"
              className={`${styles.btnlearn}`}
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section id="about" className={`${styles.about}`}>
        <h2>General Information regarding hostel</h2>
        <div className={styles.containerabout}>
          <p>
            1. The hostel facility is available to the regular students who are
            on the rolls of the institute depending upon the availability. The
            students who wish to stay with their parents or guardians outside
            the campus for a short period may be allowed to do so with the
            permission of the competent authority.
            <br />
            2. Hostel wardens are appointed for each hostel and they exercise
            'general supervision' and 'control' over the inmates.
            <br />
            3. Hostel attendants are available round the clock in the hostel. In
            case of any problem related to the hostel, the student should
            contact/meet the attendant.
            {showHostelInfo && (
              <>
                {/* Additional content */}
                <br />
                4. In case of illness or medical emergency hostel resident
                should inform to the concerned warden through hostel staff.
                <br />
                5. Possessing any kind of motorized vehicle, e.g. car, scooter,
                motorcycle, moped etc. by the hostlers is not permitted.
                <br />
                6. Any hostler is allowed to go to his/her home (only) during
                vacations/weekends against intimation to the hostel office. It
                is mandatory to fill the hostel leave form and submit to the
                security guard at hostel gate.
                <br />
                7. Institute does not own the responsibility of theft and loss
                of any items possessed by the inmates (like laptop, mobile
                phone, tablet etc). However, in the interest of inmates it is
                advised here that they may get insured their valuables.
                <br />
                8. All hostlers are required to observe the hostel timings
                strictly. The gate timings of the hostels are decided by the
                competent authority from time to time. In case of un-avoidable
                circumstances students shall have to take special permission in
                advance from the concerned warden to stay out for late hours.
                <br />
                9. For any kind of meeting in hostel premise, prior written
                permission/approval is mandatory from the competent authority.
                <br />
                10. The students shall make proper use of common rooms having
                newspapers, literature and other articles meant for indoor
                games. The hostel warden will fix hours of the common room from
                time to time.
                {/* Include other points here */}
              </>
            )}
          </p>
          {/* Toggle button */}
          <button onClick={toggleHostelInfo}>
            {showHostelInfo ? "Show Less" : "Show More"}
          </button>
        </div>
      </section>

      {/* Circulars Section */}
      <div className={styles["container-wrapper"]}>
        <section id="circulars" className={`${styles.circulars}`}>
          <div className={`${styles.container}`}>
            <h2>Circulars <GrAnnounce/> </h2>
            <p>
              <div className={styles.circularitems}>
                1. 🚨Updated timings for fast taking students: Breakfast: Same
                as Normal (7:45am- 9:45am) At their respective floors
              </div>
              <br />
              <div className={styles.circularitems}>
                2. 🔴⚠Consider this a strict warning ⚠🔴It has been observed
                regularly that students misbehave with the mess staffs. From now
                onwards if anyone is seen misbehaving with the mess staffs or
                personnel, then heavy consequences will be adhered to them.
              </div>
              <br />
              <div className={styles.circularitems}>
                3. Students who're on fast can have dinner from 7:30pm to 8:15pm
              </div>
              <br />
              <div className={styles.circularitems}>
                4. Due to unavailability of stock of Custard powder from
                vendor's side there will be Kheer in dinner for tonight.
              </div>
              <br />
              <div className={styles.circularitems}>
                5. Gulab jamun will be there in place of Mysore Pak in today's
                dinner.
              </div>
              <br />
              <div className={styles.circularitems}>
                6. Unfortunately, the institute has not finalized a vendor for
                ice cream yet. As a result, Icecream won't be served today.
                There will be Chena Malai Roll as an alternative.
              </div>
              <br />
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about1" className={`${styles.about1}`}>
          <div className={`${styles.containerabout1}`}>
            <h2>Hostel Rules <MdOutlineEventNote/> </h2>
            <p>
              <p>Disciplinary Rules:-</p>
              <div className={styles.about1items}>
                1. No student should be in possession of fire-arm, lethal
                weapon, alcohol or drugs, poisonous thing or intoxicant of any
                kind in the hostel. If anyone found guilty of having said
                material is considered breach of the rule and shall be liable to
                be expelled from the hostel, apart from any other punishment
                that may be posed to him/her by the Chief Warden/Institute
                Discipline Committee or by law of land.
              </div>
              <br />
              <div className={styles.about1items}>
                2. Any student found involved in making comments on political
                parties or govt and making anti national comments or statements
                and sharing it on social media (like twitter, face book, whats
                App etc) will be liable to strict disciplinary action including
                expulsion from hostel with immediate effect. He /She will be
                suspended from classes or may be rusticated and will be liable
                for suitable legal action.
              </div>
              <br />
              <div className={styles.about1items}>
                3. No anti social, gender-based, caste-based, religion-based and
                region-based comments/statements are acceptable from the
                students/hostel residents. This will be liable to strict
                disciplinary action as mentioned in para (2).
              </div>
              <br />
              <div className={styles.about1items}>
                4. Any type of students' gathering/campaign/agitation/protest
                and threatening the faculty/staff/student is not permitted in
                the premises of hostel/Institute. However, any campaign for the
                social awareness or well being or social concern may be
                organized with the prior permission of competent authority.
              </div>
              <br />
              <div className={styles.about1items}>
                5. Any type of electrical appliances (electric kettle, heaters,
                iron, induction etc) is not allowed in hostel room. If any
                student is found keeping these things in his/her room, he/she
                will be liable to disciplinary action.
              </div>
              <br />
              <div className={styles.about1items}>
                6. The students should not indulge in activities amounting to an
                act of indiscipline and misdemeanor such as:
              </div>
              <br />
              <div className={styles.about1items}>
                a) Disturbing the classes, misbehavior with teachers and
                students taking examination or in any other academic activity.
              </div>
              <br />
              <div className={styles.about1items}>
                b) Interfering with the functioning of various committees.
              </div>
              <br />
              <div className={styles.about1items}>
                c) Defacing the building or any structure by writing slogans and
                pasting bills and damaging the Institute property.
              </div>
              <br />
              <div className={styles.about1items}>
                d) Rash driving, driving on the pedestrian path, triple riding
                and parallel driving in restricted areas/Institute Campus.
              </div>
              <br />
              <div className={styles.about1items}>
                e) Making obscene gestures in the campus while roaming and
                sitting in and around the campus.
              </div>
              <br />
              <div className={styles.about1items}>
                f) Use of mobile phone in the classes, library and examination
                centre.
              </div>
              <br />
              The students involved in indiscipline activities will be penalized
              as per decision of the Institute Discipline committee. However,
              may be directly imposed penalty as mentioned below:
              <br />
<br />
              <div className={styles.about1items}>
                1. Cancellation of admission.
              </div>
              <br />
              <div className={styles.about1items}>
                2 .Suspension from attending classes.
              </div>
              <br />
              <div className={styles.about1items}>
                3. Withholding/withdrawing scholarship/fellowship and other
                benefits.
              </div>
              <br />
              <div className={styles.about1items}>
                4. Debarring from appearing in any test/examination or other
                evaluation processes.
              </div>
              <br />
              <div className={styles.about1items}>5. Withholding results.</div>
              <br />
              <div className={styles.about1items}>
                6. Debarring from representing the institution in any national
                or international meet, tournament, youth festival, conference
                etc.
              </div>
              <br />
              <div className={styles.about1items}>
                7. Suspension/expulsion from the hostel.
              </div>
              <br />
              <div className={styles.about1items}>
                8. Rustication from the institution.
              </div>
              <br />
              <div className={styles.about1items}>
                9. Expulsion from the institution and consequent debarring from
                admission in other institutions.
              </div>
              <br />
              <div className={styles.about1items}>
                10. Fine up to Rs. 50,000/-
              </div>
              <br />
              <div className={styles.about1items}>
                11. Collective punishment will be awarded if the individuals
                committing indiscipline are not identified.
              </div>
              <br />
              <br />
              <h4>Room Allotment Rules:-</h4>
              <br />
              <br />
              <div className={styles.about1items}>
                1 .The student must be personally present at the time of
                allotment of rooms and he/she may be allowed to choose his/her
                roommates.
              </div>
              <br />
              <div className={styles.about1items}>
                2. Every boarder is provided with a chair, a table and a cot.
                He/ She will be responsible for these items and other electrical
                fittings etc. Furniture and electrical fittings are not to be
                moved from one room to another.
              </div>
              <br />
              <div className={styles.about1items}>
                3. All the boarders shall vacate the hostel rooms before they
                leave for vacation so that annual repairs/maintenance and white
                washing etc may be carried out.
              </div>
              <br />
              <div className={styles.about1items}>
                4. All the hostel room articles issued (at the time of room
                allotment) to the students will be returned/ surrendered to the
                hostel staff/attendant/clerk before leaving the hostel during or
                at the end of the session.
              </div>
              <br />
              <div className={styles.about1items}>
                5. The room occupants will be responsible for any loss or damage
                to the items issued to him/her (at the time of room allotment)
                and the same will be recovered from them as decided by the
                competent authority.
              </div>
              <br />
              <div className={styles.about1items}>
                6. No boarder is allowed to change his/her room without the
                permission of the Warden and shall have to vacate accommodation
                as and when asked for.
              </div>
              <br />
              <div className={styles.about1items}>
                7. Each room occupant should lock his/her room. Any room found
                unlocked due to the negligence of the student/resident will be
                charged fine as decided by competent authority.
              </div>
              <br />
              <br />
              <h4>Mess Rules:-</h4>
              <br />
              <br />
              The messes of all hostels operate on cooperative basis. A
              committee of the students from every hostel manages the affairs of
              the mess under the supervision of wardens.
              <br />
<br />
              <div className={styles.about1items}>
                1. While visiting the dining hall, the common room and canteen,
                the students should be in their proper dress.
              </div>
              <br />
              <div className={styles.about1items}>
                2. All hostel inmates are required to follow the norms of the
                hostel/mess and required to deposit the mess advance (mess
                charges, maintenance charges, extra meal charges, service
                charges etc) as decided from time to time in each semester by
                the hostel authorities for availing mess facility. Minimum 55
                diets are mandatory for every hostel resident. The remaining
                balance of mess advance (if any) will be refunded after one year
                or the student leaves hostel whichever is earlier.
              </div>
              <br />
              <div className={styles.about1items}>
                3. Wastage of food is strictly prohibited; the same may be
                liable to charging of fine as decided by the competent
                authority.
              </div>
              <br />
              <br />
              <h4>Student's Guest Rule:-</h4>
              <br />
              <br />
              <div className={styles.about1items}>
                1. No outsider is allowed to stay in the hostel. However any
                relative/guest of the student may be allowed with prior
                permission of the competent authority.
              </div>
              <br />
              <div className={styles.about1items}>
                2. The permissible guests include father/ brother and
                mother/sister (in case of girl students) provided he/she comes
                from a far off place.
              </div>
              <br />
              <div className={styles.about1items}>
                3. Female guests are not permitted to stay in boys' hostel.
                Likewise male guests are not permitted to stay in the girls'
                hostel.
              </div>
              <br />
              <div className={styles.about1items}>
                4. A boarder keeping a guest without the prior permission of the
                Warden is liable to be penalized.
              </div>
              <br />
              <div className={styles.about1items}>
                5. Students/room occupants are not allowed to stay/sleep in the
                room of fellow student during daytime/night even with his/her
                consent.
              </div>
              <br />
              <br />
              <h4>Withdrawal/Expulsion from the Hostels:-</h4>
              <br />
              <br />
              <div className={styles.about1items}>
                1. After the general allotment, application for withdrawal from
                the hostel should be counter-signed by the father/guardian and
                submitted to the hostel warden. It should also be ensured that
                the student does not owe any hostel dues.
              </div>
              <br />
              <div className={styles.about1items}>
                2. The Director/ DSW/ Chief Warden may expel a boarder from the
                hostel, if he/she is in the habit of staying away without
                intimation to the hostel office, or hostel fee and mess dues are
                not cleared in time.
              </div>
              <br />
              <div className={styles.about1items}>
                3. Students who do not clear their dues, such as dues of the
                hostel mess, canteen, fine etc. by the prescribed date will not
                be registered for the subsequent semester until and unless, they
                clear all their dues and submit "No Dues Certificate" from the
                Account Section and the concerned hostel warden.
              </div>
              <br />
              <br />
            </p>
          </div>
        </section>
      </div>

      <section id="attendance" className={`${styles.attendance}`}>
        <div className={`${styles.containerabout}`}>
          <h2>Student Attendance</h2>
          <p>Will be available soon</p>
        </div>
      </section>
      <section id="addhostel" className={`${styles.addhostel}`}>
        {/* <div className={styles.container}>
          <button
            className={styles.addHostelButton}
            onClick={addHostelAndRooms}
          >
            Add Hostel and Rooms
          </button>
        </div> */}
      </section>

      <footer className={`${styles.footer}`}>
        <p>&copy; 2024 All rights reserved.</p>
      </footer>
    </>
  );
}

export default LandingPage;
