import Link from "next/link";

type Item = {
  path: string;
  name: string;
  onClick?: () => void;
};

type BreadcrumbsProps = {
  items: Item[];
};

function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {items.map((item, index) => {
          return (
            <li key={item.path + item.name}>
             <Link
                key={item.path + item.name + index}
                className={`transform hover:scale-105 transition ${
                  index === items.length - 1 ? "text-primary" : ""
                }`}
                href={item.path}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick()
                  }
                }}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Breadcrumbs;
