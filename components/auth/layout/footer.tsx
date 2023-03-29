export default function FooterSmall(props: any) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute bottom-0 w-full bg-blueGray-800"
            : "relative") + " pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="border-b-1 mb-6 border-blueGray-600" />
          <div className="flex flex-wrap items-center justify-center ">
            <div className="w-full px-4 ">
              <div className="py-1 text-center text-sm font-semibold text-white hover:text-blueGray-300">
                Copyright © {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
