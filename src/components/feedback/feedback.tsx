import { useEffect, useState } from "react";
import Avatar from "../avatar/avatar";
import Button from "../button/button";
import ItemStars from "../item/stars/stars";

export default function Feedback(props: any) {

  const [feedbacks, setFeedbacks] = useState([...props.value] || []);
  const [stars, setStars] = useState(0);
  const [progresses, setProgresses] = useState([
    { stars: '1', percents: 0, label: '1 sao' },
    { stars: '2', percents: 0, label: '2 sao' },
    { stars: '3', percents: 0, label: '3 sao' },
    { stars: '4', percents: 0, label: '4 sao' },
    { stars: '5', percents: 0, label: '5 sao' },
  ]);
  // console.log("feedbacks", feedbacks);
  let currentIdUser = localStorage.getItem('e_id_client');

  useEffect(() => {
    setFeedbacks([...props.value]);
    getAveragedStars();
    countProgress();
  }, [props.value]);

  useEffect(() => {
    getAveragedStars();
    countProgress();
  }, [feedbacks, setFeedbacks])

  const getAveragedStars = () => {
    let data = feedbacks.reduce((sum: any, feedback: any) => {
      return Math.round((sum + Number(feedback.starts) || 0) / (feedbacks.length || 1));
    }, 0);
    setStars(data);
  };

  const countProgress = () => {
    progresses.forEach((item: any) => {
      let data = [];
      data = feedbacks.filter((feedback: any) => feedback.starts === item.stars);
      item.percents = Math.round(((data.length || 0)/(feedbacks.length || 1))*100);
    })
    setProgresses([...progresses]);
    // console.log("progresses", progresses);
  }

  const likeComment = (comment: any) => {
    let index = comment.usefulWith.findIndex((item: any) => item === currentIdUser);
    if (index === -1) {
      comment.usefulWith.push(currentIdUser);
    } else {
      comment.usefulWith.splice(index, 1);
    }
    setFeedbacks([...feedbacks]);
  }

  return (
    <div className={`w-full grid 2xl:grid-cols-12 gap-5 ${props.className}`}>
      <div className="dashboard 2xl:col-span-4">
        <div className="flex items-center">
          <ItemStars value={stars} />
          <span className=""> - trung bình {stars}/5 </span>
        </div>
        <div className="my-2">
          {
            progresses.map((progress: any) => {
              return (
                <div
                  key={progress.stars}
                  className="w-full my-1 flex items-center"
                >
                  <span className="mr-2">{progress.label}</span>
                  <span className="relative mr-2">
                    <div className="w-56 h-4 rounded bg-slate-300"></div>
                    <div 
                    className="w-56 h-4 rounded absolute top-0 bg-amber-500"
                    style={{width: `${progress.percents}%`}}
                    ></div>
                  </span>
                  <span>{progress.percents}%</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="customer 2xl:col-span-8">
          {
            feedbacks.map((feedback: any) => {
              return (
                <div
                  key={feedback._id}
                  className="mb-6"
                >
                  <div className="w-full flex items-center mb-2">
                    <Avatar user={feedback.user}/>
                    <span className="ml-2 font-semibold">{feedback.user.name}</span>
                  </div> 
                  <div className="w-full flex items-center mb-2">
                    <span className="mr-2"><ItemStars value={feedback.starts} /></span>
                    <span className="text-slate-400"> Đã đánh giá vào {new Date(feedback.created).toLocaleDateString()}</span>
                  </div>
                  <div className="w-full mb-2">
                    {feedback.content}
                  </div>
                  <div className="text-slate-400 mb-2">{feedback.usefulWith?.length} người thấy hữu ích</div>
                  <div className="w-full">
                    <Button 
                      className={`w-28 bg-white drop-shadow-md text-slate-400 ${feedback.usefulWith.includes(currentIdUser)?"bg-sky-600 text-slate-100":""}`}
                      showIcon={true}
                      icon="fa-solid fa-thumbs-up text-xl"
                      label="Hữu ích"
                      handleClick={() => likeComment(feedback)}
                    />
                  </div>
                </div>
              )
            })
          }
      </div>
    </div>
  );
}
