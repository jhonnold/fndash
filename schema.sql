--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4 (Debian 11.4-1.pgdg90+1)
-- Dumped by pg_dump version 12.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- Name: game; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game (
    id integer NOT NULL,
    kills integer,
    placement character varying,
    time_played timestamp without time zone,
    stat_id integer
);


ALTER TABLE public.game OWNER TO postgres;

--
-- Name: game_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.game_id_seq OWNER TO postgres;

--
-- Name: game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.game_id_seq OWNED BY public.game.id;


--
-- Name: input; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.input (
    id integer NOT NULL,
    user_id integer,
    input_type character varying,
    created_at timestamp without time zone
);


ALTER TABLE public.input OWNER TO postgres;

--
-- Name: input_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.input_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.input_id_seq OWNER TO postgres;

--
-- Name: input_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.input_id_seq OWNED BY public.input.id;


--
-- Name: stat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stat (
    id integer NOT NULL,
    name character varying,
    mode character varying,
    is_ltm boolean NOT NULL,
    kills integer,
    matchesplayed integer,
    playersoutlived integer,
    minutesplayed integer,
    placements jsonb,
    input_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.stat OWNER TO postgres;

--
-- Name: stat_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stat_history (
    id integer NOT NULL,
    stat_id integer,
    placements jsonb,
    kills integer,
    matchesplayed integer,
    playersoutlived integer,
    minutesplayed integer,
    created_at timestamp without time zone
);


ALTER TABLE public.stat_history OWNER TO postgres;

--
-- Name: stat_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stat_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stat_history_id_seq OWNER TO postgres;

--
-- Name: stat_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stat_history_id_seq OWNED BY public.stat_history.id;


--
-- Name: stat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stat_id_seq OWNER TO postgres;

--
-- Name: stat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stat_id_seq OWNED BY public.stat.id;


--
-- Name: stat_placement_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stat_placement_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stat_placement_id_seq OWNER TO postgres;

--
-- Name: stat_placement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stat_placement (
    id integer DEFAULT nextval('public.stat_placement_id_seq'::regclass) NOT NULL,
    stat_id integer,
    placement character varying(8),
    count integer
);


ALTER TABLE public.stat_placement OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    uid character varying(32) NOT NULL,
    username character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    last_known_data_hash character varying
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: game id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game ALTER COLUMN id SET DEFAULT nextval('public.game_id_seq'::regclass);


--
-- Name: input id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.input ALTER COLUMN id SET DEFAULT nextval('public.input_id_seq'::regclass);


--
-- Name: stat id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stat ALTER COLUMN id SET DEFAULT nextval('public.stat_id_seq'::regclass);


--
-- Name: stat_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stat_history ALTER COLUMN id SET DEFAULT nextval('public.stat_history_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: stat _input_name_mode_uc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stat
    ADD CONSTRAINT _input_name_mode_uc UNIQUE (input_id, name, mode);


--
-- Name: game game_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_pkey PRIMARY KEY (id);


--
-- Name: input input_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.input
    ADD CONSTRAINT input_pkey PRIMARY KEY (id);


--
-- Name: stat_history stat_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stat_history
    ADD CONSTRAINT stat_history_pkey PRIMARY KEY (id);


--
-- Name: stat stat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stat
    ADD CONSTRAINT stat_pkey PRIMARY KEY (id);


--
-- Name: stat_placement stat_placement_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stat_placement
    ADD CONSTRAINT stat_placement_pk PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_uid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_uid_key UNIQUE (uid);


--
-- Name: _name_mode_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _name_mode_ix ON public.stat USING btree (name, mode);


--
-- Name: game game_stat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_stat_id_fkey FOREIGN KEY (stat_id) REFERENCES public.stat(id);


--
-- Name: input input_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.input
    ADD CONSTRAINT input_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: stat_history stat_history_stat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stat_history
    ADD CONSTRAINT stat_history_stat_id_fkey FOREIGN KEY (stat_id) REFERENCES public.stat(id);


--
-- Name: stat stat_input_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stat
    ADD CONSTRAINT stat_input_id_fkey FOREIGN KEY (input_id) REFERENCES public.input(id);


--
-- Name: stat_placement stat_placement_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stat_placement
    ADD CONSTRAINT stat_placement_fk FOREIGN KEY (stat_id) REFERENCES public.stat(id);


--
-- PostgreSQL database dump complete
--

