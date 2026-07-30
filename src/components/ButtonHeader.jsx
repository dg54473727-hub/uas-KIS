import { Link } from "react-router-dom";

export default function ButtonHeader(props) {
  return (
    <div className="content-center">
      <Link to={props.link}>
        <div className="bg-gray-200 shadow-lg border-1 border-black content-center text-center py-3 rounded-lg w-36 text-black text-2xl transation-all: delay-150 duration-300 ease-in-out hover:bg-gray-600 hover:text-white">
          <p>{props.name}</p>
        </div>
      </Link>
    </div>
  );
}
