import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {ICommentDto} from "@/types/comment.interface";
import {commentApi} from "@/store/api/comment.api";

import styles from './../../../layout/header/authForm/AuthForm.module.scss'
import Field from "@/components/UI/field/Field";
import {MdSend} from "react-icons/md";

const AddComment: FC<{ filmId: number | undefined }> = ({filmId}) => {

    const {register, formState: {errors}, handleSubmit, reset} = useForm<ICommentDto>({
        mode: 'onChange'
    })

    const [writeComment, {isLoading}] = commentApi.useCreateCommentMutation()

    const onSubmit: SubmitHandler<ICommentDto> = async data =>{
        writeComment({...data, filmId}).unwrap().then(() => reset())
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={'relative'}>
                <Field
                    {...register('message', {
                        required: 'Сообщение обязательно'
                    })}
                    placeholder={'Введите комментарий'}
                    error={errors.message}/>

                <button className={'text-xl absolute right-2 top-1.5 text-white'}
                disabled={isLoading}>
                    <MdSend/>
                </button>
            </div>
        </form>
    )
}

export default AddComment;