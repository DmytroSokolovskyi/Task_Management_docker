import cl from "./TaskInfo.module.scss";
import dayjs from "dayjs";
import {memo} from "react";

export default memo(function TaskInfo ({task}) {
    const date = dayjs(task.dueDate).format("YYYY-MM-DD");

    return (
        <div className={cl.modalInfoDiv}>
            <div>
                <h3>title</h3><span>{task.title}</span>
            </div>
            <div>
                <h3>description</h3><span>{task.description}</span>
            </div>
            <div>
                <h3>priority</h3><span>{task.priority}</span>
            </div>
            <div>
                <h3>dueDate</h3><span>{date}</span>
            </div>
        </div>
    );
},
);
