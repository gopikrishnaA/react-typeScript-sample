import React from "react";
import { Dropdown, DropdownMenu, DropdownToggle, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks/react-redux";
import { removeLikeItem } from "./actions";
import { TLikesState, IItem } from "./types";
import "./Likes.scss";

const Likes:React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const likes: any = useSelector(({ likes }: {likes: TLikesState}) => likes);

  const dispatch = useDispatch();
  const removeLike = (id: number) => dispatch(removeLikeItem(id));

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="likes mr-2">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          tag="span"
          onClick={toggle}
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
        >
          <Button outline color="danger" className="border-0">
            <i className="fa fa-heart" /> {likes.length}
          </Button>
        </DropdownToggle>
        <DropdownMenu className="like-list border-0 p-2" right>
          {!likes.length && <span>You haven't favourite recipies yet</span>}

          {likes.map((item: IItem) => (
            <div
              className="d-flex justify-content-between align-items-center mb-1"
              key={item.id}
              data-item={`id${item.id}`}
            >
              <Link
                to={`/recipe/${item.id}`}
                className="d-flex align-items-center"
              >
                <img
                  src={`https://spoonacular.com/recipeImages/${item.id}-90x90.jpg`}
                  height="40"
                  className="mr-2"
                  alt={item.title}
                />

                {item.title}
              </Link>

              <i
                onClick={() => removeLike(item.id)}
                className="like-list__remove fas fa-trash"
              />
            </div>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};


export { Likes };

export default Likes;
