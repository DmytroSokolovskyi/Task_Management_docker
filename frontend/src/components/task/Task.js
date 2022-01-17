import {memo, useCallback, useEffect, useState} from "react";
import Modal from "../UI/modal/Modal";
import MyCheckBox from "../UI/myCheckBox/MyCheckBox";
import TaskInfo from "../taskInfo/TaskInfo";
import cl from "./Task.module.scss";
import {useDebounce} from "../../hooks";

export default memo(function Task ({task, clickDelete, clickEdit, clickCompleted}) {
    const [showButtons, setShowButtons] = useState(false);
    const [activeModal, setActiveModal] = useState(false);
    const [check, setCheck] = useState(false);

    useEffect(() => {
        setCheck(task.isDone);
    }, []);
    const checkHandler = useCallback(() => {
        setCheck(prevState => !prevState);
        checkTaskDebounce();
    }, [check]);

    const checkTaskDebounce = useDebounce(() => {
        clickCompleted(task.id, !check);
    }, 1000);

    return (
        <div className={cl.taskRow}>
            <MyCheckBox
                checked={check}
                onChange={checkHandler}
            />
            <div className={ check ? cl.inactive : cl.taskDiv}
                onMouseEnter={() => { setShowButtons(prevState => !prevState); }}
                onMouseLeave={() => { setShowButtons(prevState => !prevState); }}>

                <div className={cl.infoTask} >
                    <span onClick={() => setActiveModal(true)}>{task.title}</span>
                </div>
                {showButtons && <div className={cl.buttonsDiv}>
                    <button className={cl.editBtn} onClick={() => clickEdit(task)}/>
                    <button className={cl.deleteBtn} onClick={() => clickDelete(task._id)}/>
                </div>
                }
                <Modal
                    active={activeModal}
                    setActive={setActiveModal}>
                    <TaskInfo task={task} />
                </Modal>
            </div>
        </div>
    );
},
);
