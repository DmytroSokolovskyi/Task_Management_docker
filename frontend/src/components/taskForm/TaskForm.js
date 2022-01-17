import {createTask, updateTask} from "../../services";
import {useFetch, useFormValid, useInput} from "../../hooks";
import MyButton from "../UI/myButton/MyButton";
import MyInput from "../UI/myInput/MyInput";
import MyLoader from "../UI/myLoader/MyLoader";
import cl from "./TaskForm.module.scss";
import dayjs from "dayjs";
import {useEffect} from "react";

export default function TaskForm ({setActive, editTask}) {
    const title = useInput("", {isEmpty: true, minLength: 3, maxLength: 60});
    const description = useInput("", {isEmpty: true, minLength: 30, maxLength: 1000});
    const priority = useInput(1, {isEmpty: true});
    const dueDate = useInput("", {isEmpty: true, inFuture: true});
    const validForm = useFormValid(title, description, priority, dueDate);
    const {goFetch, error, loading} = useFetch();

    useEffect(() => {
        if (editTask) {
            title.toSetValue(editTask.title);
            description.toSetValue(editTask.description);
            priority.toSetValue(editTask.priority);
            dueDate.toSetValue(dayjs(editTask.dueDate).format("YYYY-MM-DD"));
        }
    }, [editTask]);

    const saveEditTask = async (task) => {
        const clearTask = Object.keys(task).reduce((acc, item) => {
            if (editTask[item] !== task[item]) {
                acc[item] = task[item];
            }
            return acc;
        }, {});
        await goFetch(updateTask(clearTask, editTask.id), true);
    };

    const clickSubmit = async (e) => {
        e.preventDefault();
        const task = {
            title: title.value,
            description: description.value,
            priority: priority.value,
            dueDate: dueDate.value,
        };
        editTask ? await saveEditTask(task) : await goFetch(createTask(task), true);

        title.setValue("");
        description.setValue("");
        priority.setValue(1);
        dueDate.setValue("");

        setActive(false);
    };

    return loading
        ? <MyLoader/>
        : (
            <div className={cl.taskFormDiv}>
                <h2>{editTask ? "Edit Task" : "Create task"}</h2>
                <form name={"taskForm"} onSubmit={clickSubmit}>
                    <span>{error}</span>
                    <MyInput
                        type="text"
                        placeholder="Write title"
                        onChange={(e) => title.onChange(e)}
                        onBlur={(e) => title.onBlur(e)}
                        error={title.isDirty ? title.errorMessage : ""}
                        value={title.value}
                    > Title </MyInput>
                    <MyInput
                        type="textarea"
                        placeholder="Write description"
                        required={true}
                        onChange={(e) => description.onChange(e)}
                        onBlur={(e) => description.onBlur(e)}
                        error={description.isDirty ? description.errorMessage : ""}
                        value={description.value}
                    > Description </MyInput>
                    <MyInput
                        type="number"
                        max={5}
                        min={1}
                        onChange={(e) => priority.onChange(e)}
                        onBlur={(e) => priority.onBlur(e)}
                        error={priority.isDirty ? priority.errorMessage : ""}
                        value={priority.value}
                    > Priority </MyInput>
                    <MyInput
                        type="date"
                        onChange={(e) => dueDate.onChange(e)}
                        onBlur={(e) => dueDate.onBlur(e)}
                        error={dueDate.isDirty ? dueDate.errorMessage : ""}
                        value={dueDate.value}
                    > Due Date </MyInput>
                    <MyButton
                        type="submit"
                        disabled={validForm}
                    >{editTask ? "Edit" : "Create"}
                    </MyButton>
                </form>
            </div>
        );
}
