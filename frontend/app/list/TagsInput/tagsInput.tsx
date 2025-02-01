import { useState } from 'react'
import styles from './tagsInput.module.css'
import Tooltip from '@/app/components/tooltip/tooltip'
import FormMessage from '@/app/components/formMessage/formMessage'

interface TagsInputProps {
    onTagsChange: (tags: string[]) => void
}

const TagsInput = ({ onTagsChange }: TagsInputProps): React.ReactElement => {
    const [message, setMessage] = useState<string>('')
    const [status, setStatus] = useState<'success' | 'error' | 'neutral' | ''>('')
    const [tags, setTags] = useState<string[]>([])
    const [inputValue, setInputValue] = useState<string>('')

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key !== 'Enter') return
        addTag()
    }

    function addTag() {
        const value = inputValue.trim()
        if (!value) return

        if (tags.length == 3) {
            setStatus('error')
            setMessage('Tag Limit Reached')
            return
        }

        const newTags = [...tags, value]
        setTags(newTags)
        setInputValue('')
        onTagsChange(newTags)
    }

    function removeTag(index: number) {
        const newTags = tags.filter((_, i) => i !== index)
        setTags(newTags)
        onTagsChange(newTags)
    }

    return (
        <div className={styles.formInput}>
            <div className="flex items-center gap-2">
                <label htmlFor="tags" className={styles.formLabel}>Tags</label>
                <Tooltip text="Enter a maximum of 3 tags" size={20} />
            </div>
            <div className={styles.inputBox}>
                <input
                    onKeyDown={handleKeyDown}
                    type="text"
                    className={styles.inputBox}
                    placeholder=""
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="button" className={styles.makeButton} onClick={addTag}>
                    Create
                </button>
            </div>
            <div className="flex flex-wrap gap-x-4 max-w-[350px]">
                {tags.map((tag, index) => (
                    <div className={styles.tagBox} key={index}>
                        <span className={`bg-slate-400 text-black ${styles.tagText}`}>
                            {tag[0].toUpperCase() + tag.slice(1)}
                            <span className="close cursor-pointer" onClick={() => removeTag(index)}>
                                &times;
                            </span>
                        </span>
                    </div>
                ))}
            </div>
            <FormMessage message={message} status={status} />
        </div>
    )
}

export default TagsInput
