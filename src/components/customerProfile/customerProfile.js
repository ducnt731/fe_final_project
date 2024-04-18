import React from "react";
import Table from 'react-bootstrap/Table';

const Profile = () => {
    return (
        <Table striped bordered hover style={{ marginTop: "60px" }}>
            <thead>
                <tr>
                    <th style={{ width: "150px"}}>ca Chieu</th>
                    <th style={{ width: "150px"}}>Monday</th>
                    <th style={{ width: "150px"}}>Tuesday</th>
                    <th style={{ width: "150px"}}>Wednesday</th>
                    <th style={{ width: "150px"}}>Thursday</th>
                    <th style={{ width: "150px"}}>Friday</th>
                    <th style={{ width: "150px"}}>Saturday</th>
                    <th style={{ width: "150px"}}>Sunday</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Morning</td>
                    <td style={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            border: "2px black solid",
                            backgroundColor: "#9cdb95",
                            borderRadius: "10px",
                            textAlign: "center",
                        }}>
                            <span>phim: doremon</span>
                            <span>thoi gian: 9h-11h</span>
                            <span>phong chieu: A3</span>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            border: "2px black solid",
                            backgroundColor: "#9cdb95",
                            textAlign: "center",
                            borderRadius: "10px",
                            marginTop: "10px"
                        }}>
                            <span>phim: doremon</span>
                            <span>thoi gian: 9h-11h</span>
                            <span>phong chieu: A3</span>
                        </div>
                    </td>
                    <td>
                    <div style={{
                            display: "flex",
                            flexDirection: "column",
                            border: "2px black solid",
                            backgroundColor: "#9cdb95",
                            borderRadius: "10px",
                            textAlign: "center"
                        }}>
                            <span>phim: doremon</span>
                            <span>thoi gian: 9h-11h</span>
                            <span>phong chieu: A3</span>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            border: "2px black solid",
                            backgroundColor: "#9cdb95",
                            textAlign: "center",
                            borderRadius: "10px",
                            marginTop: "10px"
                        }}>
                            <span>phim: doremon</span>
                            <span>thoi gian: 9h-11h</span>
                            <span>phong chieu: A3</span>
                        </div>
                    </td>
                    <td>
                    <div style={{
                            display: "flex",
                            flexDirection: "column",
                            border: "2px black solid",
                            backgroundColor: "#9cdb95",
                            borderRadius: "10px",
                            textAlign: "center"
                        }}>
                            <span>phim: doremon</span>
                            <span>thoi gian: 9h-11h</span>
                            <span>phong chieu: A3</span>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            border: "2px black solid",
                            backgroundColor: "#9cdb95",
                            textAlign: "center",
                            borderRadius: "10px",
                            marginTop: "10px"
                        }}>
                            <span>phim: doremon</span>
                            <span>thoi gian: 9h-11h</span>
                            <span>phong chieu: A3</span>
                        </div>
                    </td>
                    <td>
                    <div style={{
                            display: "flex",
                            flexDirection: "column",
                            border: "2px black solid",
                            backgroundColor: "#9cdb95",
                            borderRadius: "10px",
                            textAlign: "center"
                        }}>
                            <span>phim: doremon</span>
                            <span>thoi gian: 9h-11h</span>
                            <span>phong chieu: A3</span>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            border: "2px black solid",
                            backgroundColor: "#9cdb95",
                            textAlign: "center",
                            borderRadius: "10px",
                            marginTop: "10px"
                        }}>
                            <span>phim: doremon</span>
                            <span>thoi gian: 9h-11h</span>
                            <span>phong chieu: A3</span>
                        </div>
                    </td>
                    <td>
                    <div style={{
                            display: "flex",
                            flexDirection: "column",
                            border: "2px black solid",
                            backgroundColor: "#9cdb95",
                            borderRadius: "10px",
                            textAlign: "center"
                        }}>
                            <span>phim: doremon</span>
                            <span>thoi gian: 9h-11h</span>
                            <span>phong chieu: A3</span>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            border: "2px black solid",
                            backgroundColor: "#9cdb95",
                            textAlign: "center",
                            borderRadius: "10px",
                            marginTop: "10px"
                        }}>
                            <span>phim: doremon</span>
                            <span>thoi gian: 9h-11h</span>
                            <span>phong chieu: A3</span>
                        </div>
                    </td>
                    <td>
                    <div style={{
                            display: "flex",
                            flexDirection: "column",
                            border: "2px black solid",
                            backgroundColor: "#9cdb95",
                            borderRadius: "10px",
                            textAlign: "center"
                        }}>
                            <span>phim: doremon</span>
                            <span>thoi gian: 9h-11h</span>
                            <span>phong chieu: A3</span>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            border: "2px black solid",
                            backgroundColor: "#9cdb95",
                            textAlign: "center",
                            borderRadius: "10px",
                            marginTop: "10px"
                        }}>
                            <span>phim: doremon</span>
                            <span>thoi gian: 9h-11h</span>
                            <span>phong chieu: A3</span>
                        </div>
                    </td>
                    <td>
                        
                    </td>
                </tr>
                <tr>
                    <td>Afternoon</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>Night</td>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default Profile