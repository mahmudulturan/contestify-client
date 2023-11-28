import { useQuery } from "@tanstack/react-query";
import UsersManageTable from "./UsersManageTable";
import PageTitle from "../../../../components/Shared/PageTitle/PageTitle";
import { axiosSecure } from "../../../../api/axiosSecure";
import Container from "../../../../components/Shared/Container/Container";

const UsersManager = () => {
    const {data: users, refetch} = useQuery({queryKey: ["all-users"], queryFn: async()=>{
        const res = await axiosSecure.get('/users')
        return res.data
    }})
    return (
        <div>
            <PageTitle
                heading="Manage Users"
                subHeading="Effortless Administration"
                paragraph="Simplify user oversight. Manage accounts and interactions seamlessly in the User Control Hub for an optimized administrative experience."
            ></PageTitle>
            <Container padding>
                <div className="py-12">
                    <UsersManageTable users={users} refetch={refetch}></UsersManageTable>
                </div>
            </Container>
        </div>
    );
};

export default UsersManager;