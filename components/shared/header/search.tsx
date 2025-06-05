import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/product.actions";
import { SearchIcon } from "lucide-react";

const Search = async () => {
  const categories = await getAllCategories();

  return (
    <>
      <form action="/search" method="GET">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Select name="category">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="All" value="all">
                All
              </SelectItem>
              {categories.map((x) => (
                <SelectItem key={x._count} value={x.category}>
                  {x.category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            name="q"
            type="text"
            placeholder="Enter..."
            className="md:w-[100px] lg:w-[300]"
          />

          <Button>
            <SearchIcon />
          </Button>
        </div>
      </form>
    </>
  );
};

export default Search;
