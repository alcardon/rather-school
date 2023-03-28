export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "bg-blueGray-800 absolute bottom-0 w-full"
            : "relative") + " pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="border-b-1 border-blueGray-600 mb-6" />
          <div className="flex flex-wrap items-center justify-center ">
            <div className="w-full px-4 ">
              <div className="hover:text-blueGray-300 py-1 text-center text-sm font-semibold text-white">
                Copyright © {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
