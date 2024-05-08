import { NavLink, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { IconCircleChevronRight } from "@tabler/icons-react";
import MenuItem from "@/component/MenuItem";
import { useEffect, useState } from "react";
import { submit } from "@/api/requests";

export default function Survey() {
  const loader = useLoaderData();
  const token = loader.token;
  const [menu, setMenu] = useState(loader.menu);
  const [allDone, setAllDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAllDone(menu.every((item) => item.isDone));
  }, [menu]);

  return (
    <div className="h-full overflow-y-hidden flex">
      <div className="w-[340px] overflow-y-auto flex flex-col bg-lightgray">
        {menu.map((item, index) => (
          <NavLink
            to={`${item.id}`}
            className={({ isActive }) => {
              return `flex h-[54px] px-4 py-3 gap-2 items-center hover:bg-deepblue hover:text-white ${
                isActive ? "bg-themeblue text-white" : null
              }`;
            }}
            key={index}
          >
            <MenuItem item={item} />
          </NavLink>
        ))}
        <div className="h-[54px] px-4 py-1 flex justify-end">
          <button
            className="btn"
            disabled={!allDone}
            onClick={() => {
              submit(token).then((data)=>{
                alert(data)
                navigate(`/success`);
              }).catch((e)=>alert(e))
            }}
          >
            Submit
            <IconCircleChevronRight />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Outlet context={[menu, setMenu]} />
      </div>
    </div>
  );
}
