import React, { useEffect, useState } from "react";
import CustomNavbar from "./CustomNav";
import "./Sidemenu.css";
import SideMenuComp from "./SideMenuComp";
import "./content.css";
import { Card, Alert, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import firebase from "firebase";
import "./UpdateProfile.css";
function UpdateProfile() {
  let file = {};
  const [Pimage, setPimage] = useState("");
  const { currentUser } = useAuth();
  const [userName, setuserName] = useState("");
  const [uploadMessage, setuploadMessage] = useState("");
  const [Pavail, setPavail] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    let name = db
      .collection("admin-users")
      .doc(currentUser.uid)
      .get()
      .then((cred) => {
        console.log(cred.data().UserName);
        setuserName(cred.data().UserName);
      });

    return name;
  }, []);

  useEffect(() => {
    let pic = firebase
      .storage()
      .ref("users/" + currentUser.uid + "/profile.jpg")
      .getDownloadURL()
      .then((imgUrl) => {
        setPavail(true);
        setPimage(imgUrl);
      });
    return pic;
  }, [uploadMessage]);

  function chooseFile(e) {
    file = e.target.files[0];
  }
  const uploadImage = () => {
    setloading(true);
    console.log(file);
    setuploadMessage("");
    console.log("i am clicked");
    firebase
      .storage()
      .ref("users/" + currentUser.uid + "/profile.jpg")
      .put(file)
      .then(() => {
        setuploadMessage("Your Profile Image has been Set!");
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
        setuploadMessage("Cannot Set your Profile Photo Yet");
      });
  };
  return (
    <div className="dash-container">
      <CustomNavbar />
      <SideMenuComp />
      <div className="content-div">
        <div className="activity-feed">
          <Card>
            <Card.Body>
              {uploadMessage && (
                <Alert variant="success">{uploadMessage}</Alert>
              )}
              <div>
                {Pavail ? (
                  <div className="image-holder">
                    <img
                      id="new-image"
                      className="profile-photo"
                      alt="profile image"
                      src={Pimage}
                    />
                  </div>
                ) : (
                  <div>
                    <h3>Your Profile Photo isn't set yet!</h3>
                    <input
                      type="file"
                      onChange={(event) => {
                        chooseFile(event);
                      }}
                    />
                    <Button
                      onClick={uploadImage}
                      disabled={loading}
                      variant="secondary"
                    >
                      Upload Profile Photo
                    </Button>
                  </div>
                )}
              </div>
              <div className="cred-container">
                <div className="name-holder">
                  <h2>
                    <strong>{userName}</strong>
                  </h2>
                </div>

                <div className="email-holder">
                  <h3>{currentUser.email}</h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
