import Link from "next/link";
function Error() {
  return (
    <div className="text-center mt-5 pt-5">
      <h1>sorry this page is not available</h1>
      <Link href="/">
        <button className="btn btn-primary">back to home page</button>
      </Link>
    </div>
  );
}

export default Error;
