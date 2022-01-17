import {getAllTasks, updateManyTask} from "../../services";
import {useCallback, useState} from "react";
import {useDebounce, useFetch} from "../../hooks";
import MyButton from "../UI/myButton/MyButton";
import MyCheckBox from "../UI/myCheckBox/MyCheckBox";
import cl from "./TaskNavigation.module.scss";

export default function TaskNavigation ({clickCreate}) {
    const [checkAll, setCheckAll] = useState(false);
    const {goFetch} = useFetch();

    const checkHandler = useCallback(() => {
        setCheckAll(prevState => !prevState);
        checkTaskDebounce();
    }, [checkAll]);

    const createHandler = useCallback(() => {
        clickCreate();
    }, []);

    const checkTaskDebounce = useDebounce(async () => {
        await goFetch(updateManyTask({isDone: !checkAll}), true);
    }, 1000);

    const sortHandler = useCallback(async (e) => {
        const value = e.target.value.split(",");
        const params = `?sortBy=${value[0]}&order=${value[1]}`;

        await goFetch(getAllTasks(params), true);
    }, []);

    return (
        <div className={cl.tasksNav}>
            <MyCheckBox
                checked={checkAll}
                onChange={checkHandler}
            />
            <MyButton onClick={createHandler}>
                {"Create Task"}
            </MyButton>
            <div className={cl.selectDiv}>
                <select className={cl.selectSort} name="selectSort" onChange={sortHandler}
                >
                    <option value={ ["isDone", "desc"] }>{"active first"}</option>
                    <option value={ ["isDone", "asc"] }>{"completed first"}</option>
                    <option value={ ["duration", "asc"] }>{"duration asc"}</option>
                    <option value={ ["duration", "desc"] }>{"duration desc"}</option>
                    <option value={ ["priority", "asc"] }>{"priority asc"}</option>
                    <option value={ ["priority", "desc"] }>{"priority desc"}</option>
                </select>

            </div>

        </div>
    );
}
