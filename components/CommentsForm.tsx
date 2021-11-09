import * as React from "react";
import { ICommentsForm } from "../types";
import { submitComment } from "../services";

const CommentsForm = ({ slug }: ICommentsForm) => {
  const [error, setError] = React.useState(false);
  const [localStorage, setLocalStorage] = React.useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const commentEl = React.useRef<any | null>();
  const nameEl = React.useRef<any | null>();
  const eamilEl = React.useRef<any | null>();
  const storeDataEl = React.useRef<any | null>();

  React.useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    eamilEl.current.value = window.localStorage.getItem("email");
    storeDataEl.current.value = window.localStorage.getItem("checkbox");
  }, []);

  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = eamilEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObject = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("checkbox", storeData);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("checkbox");
    }
    // debugger;
    submitComment(commentObject).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a comment
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4 ">
        <textarea
          ref={commentEl}
          className=" p-4 outline-none w-full rounded-lg focus:ring-2 focus-ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Comment.."
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 ">
        <input
          type="text"
          ref={nameEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus-ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Name"
          name="name"
        />
        <input
          type="text"
          ref={eamilEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus-ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="E-mail"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 ">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="ture"
          />
          <label
            htmlFor="storeData"
            className="text-gray-500 cursor-pointer ml-2"
          >
            Save my e-mail and for the next time i comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required.</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for Review.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
