import queryString from 'query-string';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PropTypes from "prop-types";

const Categories = ({ searchKey, setSearchKey }) => {
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();
    const handleSearch = (searchQuery) => {
        setSearchKey(searchQuery)
        let currentQuery = {};
        if (params) {
            currentQuery = queryString.parse(params.toString())
        }
        console.log(currentQuery);
        const updateQuery = { ...currentQuery, tags: searchQuery }
        const url = queryString.stringifyUrl({ url: '/all-contest', query: updateQuery })
        navigate(url)
    }
    useEffect(() => {
        if (params) {
            const { tags } = queryString.parse(params.toString())
            if (tags) {
                setSearchKey(tags)
            }
            else {
                navigate(`/all-contest?tags=all`)
            }
        }
    }, [])

    const allCatgories = [
        { name: "All", url: "all" },
        { name: "Business Contest", url: "business-contest" },
        { name: "Medical Contest", url: "medical-contest" },
        { name: "Article Writing", url: "article-writing" },
        { name: "Gaming", url: "gaming" }]
    return (
        <div className="flex items-center justify-center gap-5 overflow-x-auto flex-wrap">
            {
                allCatgories?.map((category, indx) => <button onChange={() => setSearchKey(category.url)} onClick={() => handleSearch(category.url)} className={`py-1 px-3 ${category.url.includes(searchKey) ? "bg-primaryCol/90 text-white" : "bg-transparent text-white"} font-medium border-2 border-primaryCol rounded-md transition duration-300`} key={indx}>{category.name}</button>)
            }
        </div>
    );
};

Categories.propTypes = {
    searchKey: PropTypes.node,
    setSearchKey: PropTypes.any
}

export default Categories;