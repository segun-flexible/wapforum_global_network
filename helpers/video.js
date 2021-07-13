const db = require("../models/db");

//GET VIDEO LIST
exports.getVideos = (limit,offset) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_videos A JOIN f_admins B ON A.v_author_id = B.uid WHERE A.v_status = 1 LIMIT ? OFFSET ?", [limit,offset], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//GET VIDEO BY ID
exports.getVideoById = (videoId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_videos A JOIN f_admins B ON A.v_author_id = B.uid WHERE A.v_status = 1 AND A.v_id = ?", parseInt(videoId), (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
};

//ُVIDEO BY ID
exports.editVideoById = (videoId,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_videos SET ? WHERE v_id = ?", [obj, parseInt(videoId)], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//ُUPDATE VIDEO VIEW BY ID
exports.updateVideoViewById = (videoId) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_videos SET v_views = v_views + 1 WHERE v_id = ?", parseInt(videoId), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//ُCHECK IF ALREADY EARN ON VIDEO
exports.checkIfEarnOnVideo = (videoId,userId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_videos_track WHERE v_user_id = ? AND v_video_id = ? LIMIT 1", [parseInt(userId),parseInt(videoId)], (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
};

//ُADD TO VIDEO TRACK
exports.addToVideoTrack = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_videos_track SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};
