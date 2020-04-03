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

--
-- Name: fndash; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA fndash;


ALTER SCHEMA fndash OWNER TO postgres;

--
-- Name: SCHEMA fndash; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA fndash IS 'standard public schema';


SET default_tablespace = '';

--
-- Name: game; Type: TABLE; Schema: fndash; Owner: postgres
--

CREATE TABLE fndash.game (
    id integer NOT NULL,
    kills integer,
    placement character varying,
    time_played timestamp without time zone,
    stat_id integer
);


ALTER TABLE fndash.game OWNER TO postgres;

--
-- Name: game_id_seq; Type: SEQUENCE; Schema: fndash; Owner: postgres
--

CREATE SEQUENCE fndash.game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fndash.game_id_seq OWNER TO postgres;

--
-- Name: game_id_seq; Type: SEQUENCE OWNED BY; Schema: fndash; Owner: postgres
--

ALTER SEQUENCE fndash.game_id_seq OWNED BY fndash.game.id;


--
-- Name: input; Type: TABLE; Schema: fndash; Owner: postgres
--

CREATE TABLE fndash.input (
    id integer NOT NULL,
    user_id integer,
    input_type character varying,
    created_at timestamp without time zone
);


ALTER TABLE fndash.input OWNER TO postgres;

--
-- Name: input_id_seq; Type: SEQUENCE; Schema: fndash; Owner: postgres
--

CREATE SEQUENCE fndash.input_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fndash.input_id_seq OWNER TO postgres;

--
-- Name: input_id_seq; Type: SEQUENCE OWNED BY; Schema: fndash; Owner: postgres
--

ALTER SEQUENCE fndash.input_id_seq OWNED BY fndash.input.id;


--
-- Name: stat; Type: TABLE; Schema: fndash; Owner: postgres
--

CREATE TABLE fndash.stat (
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


ALTER TABLE fndash.stat OWNER TO postgres;

--
-- Name: stat_history; Type: TABLE; Schema: fndash; Owner: postgres
--

CREATE TABLE fndash.stat_history (
    id integer NOT NULL,
    stat_id integer,
    placements jsonb,
    kills integer,
    matchesplayed integer,
    playersoutlived integer,
    minutesplayed integer,
    created_at timestamp without time zone
);


ALTER TABLE fndash.stat_history OWNER TO postgres;

--
-- Name: stat_history_id_seq; Type: SEQUENCE; Schema: fndash; Owner: postgres
--

CREATE SEQUENCE fndash.stat_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fndash.stat_history_id_seq OWNER TO postgres;

--
-- Name: stat_history_id_seq; Type: SEQUENCE OWNED BY; Schema: fndash; Owner: postgres
--

ALTER SEQUENCE fndash.stat_history_id_seq OWNED BY fndash.stat_history.id;


--
-- Name: stat_id_seq; Type: SEQUENCE; Schema: fndash; Owner: postgres
--

CREATE SEQUENCE fndash.stat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fndash.stat_id_seq OWNER TO postgres;

--
-- Name: stat_id_seq; Type: SEQUENCE OWNED BY; Schema: fndash; Owner: postgres
--

ALTER SEQUENCE fndash.stat_id_seq OWNED BY fndash.stat.id;


--
-- Name: user; Type: TABLE; Schema: fndash; Owner: postgres
--

CREATE TABLE fndash."user" (
    id integer NOT NULL,
    uid character varying(32) NOT NULL,
    username character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    last_known_data_hash character varying
);


ALTER TABLE fndash."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: fndash; Owner: postgres
--

CREATE SEQUENCE fndash.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fndash.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: fndash; Owner: postgres
--

ALTER SEQUENCE fndash.user_id_seq OWNED BY fndash."user".id;


--
-- Name: game id; Type: DEFAULT; Schema: fndash; Owner: postgres
--

ALTER TABLE ONLY fndash.game ALTER COLUMN id SET DEFAULT nextval('fndash.game_id_seq'::regclass);


--
-- Name: input id; Type: DEFAULT; Schema: fndash; Owner: postgres
--

ALTER TABLE ONLY fndash.input ALTER COLUMN id SET DEFAULT nextval('fndash.input_id_seq'::regclass);


--
-- Name: stat id; Type: DEFAULT; Schema: fndash; Owner: postgres
--

ALTER TABLE ONLY fndash.stat ALTER COLUMN id SET DEFAULT nextval('fndash.stat_id_seq'::regclass);


--
-- Name: stat_history id; Type: DEFAULT; Schema: fndash; Owner: postgres
--

ALTER TABLE ONLY fndash.stat_history ALTER COLUMN id SET DEFAULT nextval('fndash.stat_history_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: fndash; Owner: postgres
--

ALTER TABLE ONLY fndash."user" ALTER COLUMN id SET DEFAULT nextval('fndash.user_id_seq'::regclass);


--
-- Name: stat _input_name_mode_uc; Type: CONSTRAINT; Schema: fndash; Owner: postgres
--

ALTER TABLE ONLY fndash.stat
    ADD CONSTRAINT _input_name_mode_uc UNIQUE (input_id, name, mode);


--
-- Name: game game_pkey; Type: CONSTRAINT; Schema: fndash; Owner: postgres
--

ALTER TABLE ONLY fndash.game
    ADD CONSTRAINT game_pkey PRIMARY KEY (id);


--
-- Name: input input_pkey; Type: CONSTRAINT; Schema: fndash; Owner: postgres
--

ALTER TABLE ONLY fndash.input
    ADD CONSTRAINT input_pkey PRIMARY KEY (id);


--
-- Name: stat_history stat_history_pkey; Type: CONSTRAINT; Schema: fndash; Owner: postgres
--

ALTER TABLE ONLY fndash.stat_history
    ADD CONSTRAINT stat_history_pkey PRIMARY KEY (id);


--
-- Name: stat stat_pkey; Type: CONSTRAINT; Schema: fndash; Owner: postgres
--

ALTER TABLE ONLY fndash.stat
    ADD CONSTRAINT stat_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: fndash; Owner: postgres
--

ALTER TABLE ONLY fndash."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_uid_key; Type: CONSTRAINT; Schema: fndash; Owner: postgres
--

ALTER TABLE ONLY fndash."user"
    ADD CONSTRAINT user_uid_key UNIQUE (uid);


--
-- Name: _name_mode_ix; Type: INDEX; Schema: fndash; Owner: postgres
--

CREATE INDEX _name_mode_ix ON fndash.stat USING btree (name, mode);


--
-- Name: game game_stat_id_fkey; Type: FK CONSTRAINT; Schema: fndash; Owner: postgres
--

ALTER TABLE ONLY fndash.game
    ADD CONSTRAINT game_stat_id_fkey FOREIGN KEY (stat_id) REFERENCES fndash.stat(id);


--
-- Name: input input_user_id_fkey; Type: FK CONSTRAINT; Schema: fndash; Owner: postgres
--

ALTER TABLE ONLY fndash.input
    ADD CONSTRAINT input_user_id_fkey FOREIGN KEY (user_id) REFERENCES fndash."user"(id);


--
-- Name: stat_history stat_history_stat_id_fkey; Type: FK CONSTRAINT; Schema: fndash; Owner: postgres
--

ALTER TABLE ONLY fndash.stat_history
    ADD CONSTRAINT stat_history_stat_id_fkey FOREIGN KEY (stat_id) REFERENCES fndash.stat(id);


--
-- Name: stat stat_input_id_fkey; Type: FK CONSTRAINT; Schema: fndash; Owner: postgres
--

ALTER TABLE ONLY fndash.stat
    ADD CONSTRAINT stat_input_id_fkey FOREIGN KEY (input_id) REFERENCES fndash.input(id);


--
-- PostgreSQL database dump complete
--

