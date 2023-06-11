interface ListProps<T> {
   items: T[];
   renderItem: (item: T) => React.ReactNode;
}

export default function List<T>(props: ListProps<T>) {
   return (
      <div className="flex flex-wrap justify-center gap-4">
         {props.items.map(props.renderItem)}
      </div>
   );
}
