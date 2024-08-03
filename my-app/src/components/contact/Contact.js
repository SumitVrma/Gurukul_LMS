import React, { useRef, useState } from 'react'
import ContactImg from '../../assets/contact.PNG'
import emailjs from "@emailjs/browser";
import { NavBar } from 'components/NavBar';

// email template id - template_9qbvk92
// email service id - service_iy4iih4
// public key - jfiobUs229dkhCgrg

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      'service_iy4iih4',
      'template_9qbvk92',
      {
        from_name: form.name,
        to_name: 'Hemanth',
        from_email: form.email,
        to_email: 'hemumani73@gmail.com',
        message: form.message,
      },
      'jfiobUs229dkhCgrg'
    )
      .then(() => {
        setLoading(false);
        alert("Thank You. I will get back to you as soon as possible.");

        setForm({
          name: "",
          email: "",
          message: "",
        })
      }, (error) => {
        setLoading(false);
        console.log('FAILED...', error);
        alert("Something went wrong");
      })
  };
  return (
    <div>

      <NavBar />
      <div class="max-w-screen-xl mt-24 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-[#F7FAFC] text-gray-900 rounded-lg shadow-lg mb-24">
        <div class="flex flex-col justify-between">
          <div>
            <h2 class="text-4xl lg:text-5xl font-bold leading-tight">Lets talk about everything!</h2>
            <div class="text-gray-700 mt-8">
              Hate forms? Send us an <span class="underline">email</span> instead.
            </div>
          </div>
          <div class="mt-8 text-center">
            <img src={ContactImg} />
          </div>
        </div>
        <form ref={formRef}
          onSubmit={handleSubmit}>
          <div>
            <span class="uppercase text-sm text-gray-600 font-bold">Full Name</span>
            <input
              class="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder=""
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div class="mt-8">
            <span class="uppercase text-sm text-gray-600 font-bold">Email</span>
            <input
              class="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div class="mt-8">
            <span class="uppercase text-sm text-gray-600 font-bold">Message</span>
            <textarea
              class="w-full h-32 bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              name="message"
              value={form.message}
              onChange={handleChange}
            />
          </div>
          <div class="mt-8">
            <button
              type='submit'
              class="uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
              {loading ? "Sending Message..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
