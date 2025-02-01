'use client'

import React from 'react'

const faqs = [
    {
        id: 1,
        qn: 'Can I chope the discounted food?',
        ans: 'Unfortunately, we operate on a first come first serve basis. Rest assure, the quantity of items left will be listed on the listing so you know if there is stock left.'
    },
    {
        id: 2,
        qn: 'Are the food items safe to consume?',
        ans: 'Yes! We ensure all products meet safety standards. Items nearing their best-before date are still perfectly safe to eat but are sold at a discount to prevent waste.'
    },
    {
        id: 3,
        qn: 'How does using BiteSaver help reduce food waste?',
        ans: 'By purchasing surplus or short-dated items, you help prevent perfectly good food from going to waste. This also supports sustainable practices and benefits the environment.'
    },
    {
        id: 4,
        qn: 'Do I need an account if I am a user?',
        ans: 'No. Only businesses require to sign into an account. Can access all of the current listings through the browse page.'
    },
    {
        id: 5,
        qn: 'How do I contact customer support?',
        ans: 'You can reach us via email at bitesaver12345@gmail.com, or by calling +65 91234567. Our team is available from 9:00 pm to 5:00 pm Monday to Friday to assist you.'
    },
]

const Faq = (): React.ReactElement => {
    return (
        <div className="mt-6" data-theme="night">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-primary text-center text-4xl font-bold">Frequently Asked Questions</h1>
                <span>
                    Got questions? We&apos;ve got answers.
                </span>
            </div>

            <div className="flex flex-col items-center gap-6 mt-12">
                {faqs.map((faq) => (
                    <div className="collapse collapse-plus bg-base-200 w-1/2" key={faq.id}>
                        <input type="radio" name="faq" />
                        <div className="collapse-title text-xl font-medium">{faq.qn}</div>
                        <div className="collapse-content">
                            <p>{faq.ans}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Faq;