"use client";
import React from "react";
import Togglebutton from "../../../components/togglebutton";
import { useEffect } from "react";
import axios from "axios";
import { API } from "@/Essentials";
import { useState } from "react";

function access({ id, comid }) {
  const [post, setPost] = useState()
  useEffect(() => {
    if (id) {
      axios
        .get(`${API}/getpost/${id}`)
        .then((res) => {

          setPost(res.data.posts)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  console.log(post)
  return (
    // <div className="pt-5 space-y-5 sm:px-[30%] px-1 bg-white py-3 mt-4">
    //   <div className="flex justify-between items-center">
    //     <div>Block screenshot</div>
    //     <div>
    //       <Togglebutton />
    //     </div>
    //   </div>
    //   <div className="flex justify-between items-center">
    //     <div>Block screen recording</div>
    //     <div>
    //       <Togglebutton />
    //     </div>
    //   </div>
    //   <div className="flex justify-between items-center">
    //     <div>Block message forwarding</div>
    //     <div>
    //       <Togglebutton />
    //     </div>
    //   </div>
    //   <div className="flex justify-between items-center">
    //     <div>Block message deletion</div>
    //     <div>
    //       <Togglebutton />
    //     </div>
    //   </div>
    //   <div className="flex justify-between items-center">
    //     <div>Hide members</div>
    //     <div>
    //       <Togglebutton />
    //     </div>
    //   </div>
    // </div>
    <>
      <div>
        {post?.map((d, i) => (
          <div key={i} className="flex flex-col items-center w-full gap-4 justify-center">
            <div>post name {d?.title}</div>
            <div>Community name {d?.communityName}</div>
            <div className="flex justify-center items-center gap-5">
              <div>Likes {d?.likes}</div>
              <div>Dislike {d?.dislike}</div>
              <div>Share {d?.sharescount}</div>
              <div>Views {d?.views}</div>
              <div>comments {d?.comments.length}</div>
              <div>created at {d?.createdAt}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default access;
